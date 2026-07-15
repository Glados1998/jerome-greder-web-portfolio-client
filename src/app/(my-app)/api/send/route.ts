import {Resend} from "resend";
import {EmailTemplate} from "@/app/(my-app)/[locale]/components/email-template";
import {
    type ContactApiResponse,
    type ContactErrorCode,
} from "@/lib/contact-shared";
import {
    contactSubmissionSchema,
    getInvalidContactFields,
    isAllowedContactOrigin,
    isHoneypotSubmission,
    readContactRequestBody,
    verifyTurnstileToken,
} from "@/lib/contact-server";

const responseHeaders = {
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
};

function jsonResponse(body: ContactApiResponse, status = 200) {
    return Response.json(body, {status, headers: responseHeaders});
}

function errorResponse(code: ContactErrorCode, status: number) {
    return jsonResponse({ok: false, code}, status);
}

export async function POST(request: Request) {
    try {
        if (!isAllowedContactOrigin(request, process.env.CONTACT_FORM_ALLOWED_ORIGINS)) {
            return errorResponse("FORBIDDEN", 403);
        }

        const body = await readContactRequestBody(request);

        if (body.ok === false) {
            return errorResponse(body.code, body.status);
        }

        // Check the honeypot before the strict schema so basic bots do not need to know
        // about Turnstile or idempotency fields to receive the same response as a user.
        if (isHoneypotSubmission(body.value)) return jsonResponse({ok: true});

        const parsedSubmission = contactSubmissionSchema.safeParse(body.value);

        if (!parsedSubmission.success) {
            return jsonResponse({
                ok: false,
                code: "INVALID_INPUT",
                fields: getInvalidContactFields(parsedSubmission.error),
            }, 400);
        }

        const {
            name,
            email,
            subject,
            message,
            turnstileToken,
            submissionId,
        } = parsedSubmission.data;

        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!turnstileSecret || !resendApiKey) {
            console.error("Contact form configuration is incomplete", {
                hasResendApiKey: Boolean(resendApiKey),
                hasTurnstileSecret: Boolean(turnstileSecret),
            });
            return errorResponse("CONFIGURATION_ERROR", 503);
        }

        const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean);
        const verification = await verifyTurnstileToken(
            turnstileToken,
            turnstileSecret,
            allowedHostnames,
        );

        if (verification.ok === false) {
            const code = verification.reason === "invalid"
                ? "VERIFICATION_FAILED"
                : "VERIFICATION_UNAVAILABLE";
            const status = verification.reason === "invalid" ? 400 : 503;

            return errorResponse(code, status);
        }

        const resend = new Resend(resendApiKey);
        const {error} = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL,
            to: process.env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: `${subject}`,
            react: EmailTemplate({name, email, message}),
        }, {
            idempotencyKey: `contact/${submissionId}`,
        });

        if (error) {
            console.error("Contact email could not be sent", error);
            return errorResponse("SEND_FAILED", 502);
        }

        return jsonResponse({ok: true});
    } catch (error) {
        console.error("Unexpected contact form error", error);
        return errorResponse("SEND_FAILED", 500);
    }
}
