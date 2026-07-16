/**
 * Browser-safe contract shared by the contact page and its API route.
 *
 * Keep this module free of server-only dependencies and environment variables: it is imported into
 * the client bundle. Changes to limits or response codes should be reflected on both sides of the
 * request, which is why they live here rather than in the page or route.
 */

/** Canonical payload limits used by HTML controls and authoritative server validation. */
export const CONTACT_LIMITS = {
    name: {min: 2, max: 80},
    email: {max: 254},
    subject: {min: 3, max: 120},
    message: {min: 10, max: 5000},
    honeypot: {max: 200},
    turnstileToken: {max: 2048},
    requestBody: 16 * 1024,
} as const;

/** User-editable fields that may be returned to the browser as validation errors. */
export const CONTACT_FIELDS = ["name", "email", "subject", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

/**
 * Controlled form state. `website` is an intentionally hidden honeypot and must remain empty for
 * legitimate visitors.
 */
export type ContactFormValues = Record<ContactField, string> & {
    website: string;
};

/** Stable machine-readable failures returned by `/api/send`. */
export type ContactErrorCode =
    | "INVALID_REQUEST"
    | "REQUEST_TOO_LARGE"
    | "FORBIDDEN"
    | "INVALID_INPUT"
    | "VERIFICATION_FAILED"
    | "VERIFICATION_UNAVAILABLE"
    | "CONFIGURATION_ERROR"
    | "SEND_FAILED";

/**
 * Public API contract. The server returns codes instead of internal exception messages so the UI
 * can localize feedback without leaking provider or configuration details.
 */
export type ContactApiResponse =
    | {ok: true}
    | {ok: false; code: ContactErrorCode; fields?: ContactField[]};
