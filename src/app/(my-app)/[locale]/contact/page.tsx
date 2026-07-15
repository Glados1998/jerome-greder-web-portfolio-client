"use client";

import contactImage from "../assets/images/contact-banner.jpg";
import {
    type ChangeEvent,
    type FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Image from "next/image";
import Script from "next/script";
import {BsLinkedin} from "react-icons/bs";
import {useTranslations} from "use-intl";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";
import {Link} from "@/i18n/routing";
import {
    CONTACT_LIMITS,
    type ContactApiResponse,
    type ContactField,
    type ContactFormValues,
} from "@/lib/contact-shared";

type SubmissionStatus =
    | "idle"
    | "loading"
    | "success"
    | "error"
    | "validationError"
    | "verificationError"
    | "rateLimitError"
    | "unavailable";

type TurnstileWidgetOptions = {
    sitekey: string;
    action: string;
    theme: "auto";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
};

type TurnstileApi = {
    render: (container: HTMLElement, options: TurnstileWidgetOptions) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const emptyForm: ContactFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
};

export default function Contact() {
    const t = useTranslations("page.Contact");
    const [formData, setFormData] = useState<ContactFormValues>(emptyForm);
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [fieldErrors, setFieldErrors] = useState<ContactField[]>([]);
    const [turnstileToken, setTurnstileToken] = useState("");
    const turnstileContainerRef = useRef<HTMLDivElement>(null);
    const turnstileWidgetIdRef = useRef<string | null>(null);
    const submissionIdRef = useRef<string | null>(null);

    const renderTurnstile = useCallback(() => {
        if (
            !turnstileSiteKey
            || !turnstileContainerRef.current
            || !window.turnstile
            || turnstileWidgetIdRef.current
        ) {
            return;
        }

        turnstileWidgetIdRef.current = window.turnstile.render(
            turnstileContainerRef.current,
            {
                sitekey: turnstileSiteKey,
                action: "contact",
                theme: "auto",
                callback: (token) => {
                    setTurnstileToken(token);
                    setStatus((currentStatus) => currentStatus === "verificationError" ? "idle" : currentStatus);
                },
                "expired-callback": () => setTurnstileToken(""),
                "error-callback": () => {
                    setTurnstileToken("");
                    setStatus("verificationError");
                },
            },
        );
    }, []);

    const resetTurnstile = useCallback(() => {
        if (turnstileWidgetIdRef.current && window.turnstile) {
            window.turnstile.reset(turnstileWidgetIdRef.current);
        }
        setTurnstileToken("");
    }, []);

    useEffect(() => {
        renderTurnstile();

        return () => {
            if (turnstileWidgetIdRef.current && window.turnstile) {
                window.turnstile.remove(turnstileWidgetIdRef.current);
                turnstileWidgetIdRef.current = null;
            }
        };
    }, [renderTurnstile]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.target.name as keyof ContactFormValues;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [field]: event.target.value,
        }));
        setFieldErrors((currentErrors) => currentErrors.filter((currentField) => currentField !== field));
        submissionIdRef.current = null;

        if (status !== "loading") setStatus("idle");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!turnstileToken || !turnstileSiteKey || status === "loading") {
            setStatus(turnstileSiteKey ? "verificationError" : "unavailable");
            return;
        }

        setStatus("loading");
        setFieldErrors([]);
        submissionIdRef.current ??= crypto.randomUUID();

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...formData,
                    turnstileToken,
                    submissionId: submissionIdRef.current,
                }),
            });
            const result = await response.json().catch(() => null) as ContactApiResponse | null;

            if (response.ok && result?.ok === true) {
                setStatus("success");
                setFormData(emptyForm);
                submissionIdRef.current = null;
                return;
            }

            if (response.status === 429) {
                setStatus("rateLimitError");
                return;
            }

            if (result?.ok === false) {
                if (result.code === "INVALID_INPUT") {
                    const invalidFields = result.fields ?? [];
                    setFieldErrors(invalidFields);
                    setStatus("validationError");

                    if (invalidFields[0]) {
                        requestAnimationFrame(() => {
                            document.getElementById(`contact-${invalidFields[0]}`)?.focus();
                        });
                    }
                    return;
                }

                if (result.code === "VERIFICATION_FAILED") {
                    setStatus("verificationError");
                    return;
                }

                if (result.code === "CONFIGURATION_ERROR" || result.code === "VERIFICATION_UNAVAILABLE") {
                    setStatus("unavailable");
                    return;
                }
            }

            setStatus("error");
        } catch {
            setStatus("error");
        } finally {
            resetTurnstile();
        }
    };

    const feedbackMessage = status === "success"
        ? t("successMessage")
        : status === "validationError"
            ? t("validationMessage")
            : status === "verificationError"
                ? t("verificationMessage")
                : status === "rateLimitError"
                    ? t("rateLimitMessage")
                    : status === "unavailable"
                        ? t("unavailableMessage")
                        : status === "error"
                            ? t("errorMessage")
                            : null;
    const feedbackIsError = status !== "success" && feedbackMessage !== null;
    const hasFieldError = (field: ContactField) => fieldErrors.includes(field);

    return (
        <div className="flex flex-col space-y-16 md:space-y-24 px-4 md:px-8 lg:px-12 py-10 max-w-6xl mx-auto">
            <section className="text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {t.rich("title", {br: () => <br/>})}
                </h1>
            </section>

            <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                <div className="w-full md:w-1/2">
                    <Image
                        src={contactImage}
                        alt={t("imageAlt")}
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg object-cover w-full h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                    <form onSubmit={handleSubmit} aria-busy={status === "loading"}>
                        <fieldset disabled={status === "loading"} className="space-y-4">
                            <legend className="sr-only">{t("formLegend")}</legend>

                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
                                    {t("nameLabel")}
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    minLength={CONTACT_LIMITS.name.min}
                                    maxLength={CONTACT_LIMITS.name.max}
                                    required
                                    aria-invalid={hasFieldError("name") || undefined}
                                    aria-describedby={hasFieldError("name") ? "contact-name-error" : undefined}
                                    className="input w-full"
                                />
                                {hasFieldError("name") && (
                                    <p id="contact-name-error" className="text-sm text-red-600 mt-1">
                                        {t("fieldError")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
                                    {t("emailLabel")}
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    inputMode="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    maxLength={CONTACT_LIMITS.email.max}
                                    required
                                    aria-invalid={hasFieldError("email") || undefined}
                                    aria-describedby={hasFieldError("email") ? "contact-email-error" : undefined}
                                    className="input w-full"
                                />
                                {hasFieldError("email") && (
                                    <p id="contact-email-error" className="text-sm text-red-600 mt-1">
                                        {t("fieldError")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="contact-subject" className="block text-sm font-medium mb-1">
                                    {t("subjectLabel")}
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    minLength={CONTACT_LIMITS.subject.min}
                                    maxLength={CONTACT_LIMITS.subject.max}
                                    required
                                    aria-invalid={hasFieldError("subject") || undefined}
                                    aria-describedby={hasFieldError("subject") ? "contact-subject-error" : undefined}
                                    className="input w-full"
                                />
                                {hasFieldError("subject") && (
                                    <p id="contact-subject-error" className="text-sm text-red-600 mt-1">
                                        {t("fieldError")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
                                    {t("messageLabel")}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    minLength={CONTACT_LIMITS.message.min}
                                    maxLength={CONTACT_LIMITS.message.max}
                                    required
                                    spellCheck
                                    aria-invalid={hasFieldError("message") || undefined}
                                    aria-describedby={hasFieldError("message") ? "contact-message-error" : undefined}
                                    className="input w-full h-32"
                                />
                                {hasFieldError("message") && (
                                    <p id="contact-message-error" className="text-sm text-red-600 mt-1">
                                        {t("fieldError")}
                                    </p>
                                )}
                            </div>

                            <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
                                <label htmlFor="contact-website">Website</label>
                                <input
                                    id="contact-website"
                                    type="text"
                                    name="website"
                                    autoComplete="off"
                                    tabIndex={-1}
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>

                            {turnstileSiteKey ? (
                                <>
                                    <Script
                                        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                                        strategy="afterInteractive"
                                        onReady={renderTurnstile}
                                    />
                                    <div
                                        ref={turnstileContainerRef}
                                        className="min-h-[65px]"
                                        aria-label={t("verificationLabel")}
                                    />
                                </>
                            ) : (
                                <p className="text-sm text-red-600" role="alert">
                                    {t("unavailableMessage")}
                                </p>
                            )}

                            <noscript>
                                <p className="text-sm text-red-600">{t("javascriptRequired")}</p>
                            </noscript>

                            <p className="text-xs text-slate-600 dark:text-slate-300">
                                {t("privacyNotice")}{" "}
                                <Link href="/legal" className="underline underline-offset-2">
                                    {t("privacyLink")}
                                </Link>
                            </p>

                            <button
                                type="submit"
                                disabled={status === "loading" || !turnstileSiteKey || !turnstileToken}
                                className="btn w-full"
                            >
                                {status === "loading" ? t("sending") : t("send")}
                            </button>
                        </fieldset>
                    </form>

                    <div aria-live="polite" className="min-h-6">
                        {feedbackMessage && (
                            <p
                                role={feedbackIsError ? "alert" : "status"}
                                className={feedbackIsError ? "text-red-600" : "text-green-600"}
                            >
                                {feedbackMessage}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-lg font-medium">{t("linkedin")}</p>
                        <SocialBtn
                            href="https://www.linkedin.com/in/jerome-greder/"
                            target="_blank"
                            className="btn-linkedin"
                        >
                            <BsLinkedin/>
                            Linkedin
                        </SocialBtn>
                    </div>
                </div>
            </section>
        </div>
    );
}
