export const CONTACT_LIMITS = {
    name: {min: 2, max: 80},
    email: {max: 254},
    subject: {min: 3, max: 120},
    message: {min: 10, max: 5000},
    honeypot: {max: 200},
    turnstileToken: {max: 2048},
    requestBody: 16 * 1024,
} as const;

export const CONTACT_FIELDS = ["name", "email", "subject", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactFormValues = Record<ContactField, string> & {
    website: string;
};

export type ContactErrorCode =
    | "INVALID_REQUEST"
    | "REQUEST_TOO_LARGE"
    | "FORBIDDEN"
    | "INVALID_INPUT"
    | "VERIFICATION_FAILED"
    | "VERIFICATION_UNAVAILABLE"
    | "CONFIGURATION_ERROR"
    | "SEND_FAILED";

export type ContactApiResponse =
    | {ok: true}
    | {ok: false; code: ContactErrorCode; fields?: ContactField[]};
