/**
 * Security and contract regression tests for the contact endpoint.
 *
 * Provider calls are replaced with injected fetch implementations, and honeypot route tests exit
 * before Resend is constructed, so this suite never verifies a real token or sends a real email.
 */

import assert from "node:assert/strict";
import test from "node:test";
import {POST} from "../app/(my-app)/api/send/route";
import {
    contactSubmissionSchema,
    getInvalidContactFields,
    isAllowedContactOrigin,
    isHoneypotSubmission,
    readContactRequestBody,
    verifyTurnstileToken,
} from "./contact-server";

/** Complete baseline payload reused when each test changes one security-relevant condition. */
const validSubmission = {
    name: "Jérôme Greder",
    email: "visitor@example.com",
    subject: "Project enquiry",
    message: "I would like to discuss a new portfolio project.",
    website: "",
    turnstileToken: "turnstile-token",
    submissionId: "d9428888-122b-4c0c-bc07-33be7a7ff4c9",
};

// Schema and public validation-error behavior.
test("the contact schema trims valid input", () => {
    const result = contactSubmissionSchema.safeParse({
        ...validSubmission,
        name: "  Jérôme Greder  ",
        email: "  visitor@example.com  ",
    });

    assert.equal(result.success, true);
    if (result.success) {
        assert.equal(result.data.name, "Jérôme Greder");
        assert.equal(result.data.email, "visitor@example.com");
    }
});

test("the contact schema rejects unexpected fields and control characters", () => {
    const result = contactSubmissionSchema.safeParse({
        ...validSubmission,
        subject: "Hello\r\nBcc: target@example.com",
        admin: true,
    });

    assert.equal(result.success, false);
});

test("validation errors expose only visible form field names", () => {
    const result = contactSubmissionSchema.safeParse({
        ...validSubmission,
        email: "not-an-email",
        message: "short",
        turnstileToken: "",
    });

    assert.equal(result.success, false);
    if (!result.success) {
        assert.deepEqual(getInvalidContactFields(result.error).sort(), ["email", "message"]);
    }
});

test("the honeypot detects basic bot submissions before strict validation", () => {
    assert.equal(isHoneypotSubmission({
        name: "Bot",
        email: "bot@example.com",
        website: "https://spam.example",
    }), true);
    assert.equal(isHoneypotSubmission(validSubmission), false);
});

test("the contact route silently accepts a honeypot without sending", async () => {
    const response = await POST(new Request("https://example.com/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Origin: "https://example.com",
        },
        body: JSON.stringify({website: "https://spam.example"}),
    }));

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {ok: true});
});

test("the contact route rejects cross-origin browser requests", async () => {
    const response = await POST(new Request("https://example.com/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Origin: "https://attacker.example",
        },
        body: JSON.stringify({website: "https://spam.example"}),
    }));

    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), {ok: false, code: "FORBIDDEN"});
});

// Bounded request parsing and origin policy.
test("request parsing requires JSON", async () => {
    const request = new Request("https://example.com/api/send", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: JSON.stringify(validSubmission),
    });

    assert.deepEqual(await readContactRequestBody(request), {
        ok: false,
        code: "INVALID_REQUEST",
        status: 415,
    });
});

test("request parsing rejects an oversized body", async () => {
    const request = new Request("https://example.com/api/send", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: "x".repeat(20_000)}),
    });

    assert.deepEqual(await readContactRequestBody(request), {
        ok: false,
        code: "REQUEST_TOO_LARGE",
        status: 413,
    });
});

test("request parsing returns valid JSON", async () => {
    const request = new Request("https://example.com/api/send", {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify(validSubmission),
    });
    const result = await readContactRequestBody(request);

    assert.equal(result.ok, true);
    if (result.ok) assert.deepEqual(result.value, validSubmission);
});

test("origin checks allow same-origin and configured preview origins", () => {
    const sameOriginRequest = new Request("https://jerome-greder.com/api/send", {
        headers: {Origin: "https://jerome-greder.com"},
    });
    const previewRequest = new Request("https://jerome-greder.com/api/send", {
        headers: {Origin: "https://portfolio-preview.vercel.app"},
    });
    const foreignRequest = new Request("https://jerome-greder.com/api/send", {
        headers: {Origin: "https://attacker.example"},
    });

    assert.equal(isAllowedContactOrigin(sameOriginRequest), true);
    assert.equal(
        isAllowedContactOrigin(previewRequest, "https://portfolio-preview.vercel.app"),
        true,
    );
    assert.equal(isAllowedContactOrigin(foreignRequest), false);
});

// Cloudflare adapter behavior; all responses below are local test doubles.
test("Turnstile verification checks the action and hostname", async () => {
    const verification = await verifyTurnstileToken(
        "token",
        "secret",
        ["jerome-greder.com"],
        async (_input, init) => {
            assert.equal(init?.method, "POST");
            assert.match(String(init?.body), /response=token/);
            return Response.json({
                success: true,
                action: "contact",
                hostname: "jerome-greder.com",
            });
        },
    );

    assert.deepEqual(verification, {ok: true});
});

test("Turnstile verification rejects tokens for another action", async () => {
    const verification = await verifyTurnstileToken(
        "token",
        "secret",
        [],
        async () => Response.json({
            success: true,
            action: "login",
            hostname: "jerome-greder.com",
        }),
    );

    assert.deepEqual(verification, {ok: false, reason: "invalid"});
});

test("Turnstile verification treats provider failures as unavailable", async () => {
    const verification = await verifyTurnstileToken(
        "token",
        "secret",
        [],
        async () => new Response(null, {status: 503}),
    );

    assert.deepEqual(verification, {ok: false, reason: "unavailable"});
});
