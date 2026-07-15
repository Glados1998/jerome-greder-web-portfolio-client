import {z} from "zod";
import {
    CONTACT_FIELDS,
    CONTACT_LIMITS,
    type ContactField,
} from "@/lib/contact-shared";

const singleLineText = (minimum: number, maximum: number) =>
    z.string()
        .trim()
        .min(minimum)
        .max(maximum)
        .refine((value) => !/[\u0000-\u001f\u007f]/.test(value));

export const contactSubmissionSchema = z.object({
    name: singleLineText(CONTACT_LIMITS.name.min, CONTACT_LIMITS.name.max),
    email: z.string().trim().max(CONTACT_LIMITS.email.max).pipe(z.email()),
    subject: singleLineText(CONTACT_LIMITS.subject.min, CONTACT_LIMITS.subject.max),
    message: z.string()
        .trim()
        .min(CONTACT_LIMITS.message.min)
        .max(CONTACT_LIMITS.message.max)
        .refine((value) => !value.includes("\u0000")),
    website: z.string().max(CONTACT_LIMITS.honeypot.max).default(""),
    turnstileToken: z.string().trim().min(1).max(CONTACT_LIMITS.turnstileToken.max),
    submissionId: z.uuid(),
}).strict();

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

const honeypotSchema = z.object({
    website: z.string().min(1).max(CONTACT_LIMITS.honeypot.max),
}).passthrough();

export function isHoneypotSubmission(value: unknown): boolean {
    return honeypotSchema.safeParse(value).success;
}

type RequestBodyResult =
    | {ok: true; value: unknown}
    | {ok: false; code: "INVALID_REQUEST" | "REQUEST_TOO_LARGE"; status: 400 | 413 | 415};

export async function readContactRequestBody(request: Request): Promise<RequestBodyResult> {
    const mediaType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();

    if (mediaType !== "application/json") {
        return {ok: false, code: "INVALID_REQUEST", status: 415};
    }

    const declaredLength = Number(request.headers.get("content-length"));

    if (Number.isFinite(declaredLength) && declaredLength > CONTACT_LIMITS.requestBody) {
        return {ok: false, code: "REQUEST_TOO_LARGE", status: 413};
    }

    if (!request.body) {
        return {ok: false, code: "INVALID_REQUEST", status: 400};
    }

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let byteLength = 0;

    try {
        while (true) {
            const {done, value} = await reader.read();

            if (done) break;

            byteLength += value.byteLength;

            if (byteLength > CONTACT_LIMITS.requestBody) {
                await reader.cancel();
                return {ok: false, code: "REQUEST_TOO_LARGE", status: 413};
            }

            chunks.push(value);
        }

        const body = new Uint8Array(byteLength);
        let offset = 0;

        for (const chunk of chunks) {
            body.set(chunk, offset);
            offset += chunk.byteLength;
        }

        const text = new TextDecoder("utf-8", {fatal: true}).decode(body);
        return {ok: true, value: JSON.parse(text)};
    } catch {
        return {ok: false, code: "INVALID_REQUEST", status: 400};
    } finally {
        reader.releaseLock();
    }
}

export function getInvalidContactFields(error: z.ZodError): ContactField[] {
    const invalidFields = new Set<ContactField>();

    for (const issue of error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && CONTACT_FIELDS.includes(field as ContactField)) {
            invalidFields.add(field as ContactField);
        }
    }

    return Array.from(invalidFields);
}

export function isAllowedContactOrigin(request: Request, configuredOrigins = ""): boolean {
    const origin = request.headers.get("origin");

    if (!origin) return true;

    const allowedOrigins = new Set([
        new URL(request.url).origin,
        ...configuredOrigins
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
    ]);

    return allowedOrigins.has(origin);
}

const turnstileResponseSchema = z.object({
    success: z.boolean(),
    action: z.string().optional(),
    hostname: z.string().optional(),
    "error-codes": z.array(z.string()).optional(),
}).passthrough();

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export type TurnstileVerification =
    | {ok: true}
    | {ok: false; reason: "invalid" | "unavailable"};

export async function verifyTurnstileToken(
    token: string,
    secret: string,
    allowedHostnames: string[],
    fetchImplementation: FetchLike = fetch,
): Promise<TurnstileVerification> {
    try {
        const response = await fetchImplementation(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({secret, response: token}),
                cache: "no-store",
            },
        );

        if (!response.ok) return {ok: false, reason: "unavailable"};

        const parsedResponse = turnstileResponseSchema.safeParse(await response.json());

        if (!parsedResponse.success) return {ok: false, reason: "unavailable"};

        const result = parsedResponse.data;
        const hostnameIsAllowed = allowedHostnames.length === 0
            || (result.hostname !== undefined && allowedHostnames.includes(result.hostname));

        if (!result.success || result.action !== "contact" || !hostnameIsAllowed) {
            return {ok: false, reason: "invalid"};
        }

        return {ok: true};
    } catch {
        return {ok: false, reason: "unavailable"};
    }
}
