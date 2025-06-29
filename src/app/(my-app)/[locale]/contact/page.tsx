"use client";
import contactImage from "../assets/images/contact-banner.jpg";
import {useState} from "react";
import Image from "next/image";
import {BsLinkedin} from "react-icons/bs";
import {useTranslations} from "use-intl";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";

export default function Contact() {
/**
 * Hook for translations based on the current locale.
 */
const t = useTranslations("page.Contact");

/**
 * State for storing form data entered by the user.
 * @type {{name: string, email: string, subject: string, message: string}}
 */
const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
});

/**
 * State for tracking the status of the form submission.
 * Possible values: "idle", "loading", "success", "error".
 * @type {string}
 */
const [status, setStatus] = useState("idle");

/**
 * Handles changes to the form inputs.
 * Updates the `formData` state with the new values.
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event from the input or textarea.
 */
const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
};

/**
 * Handles form submission.
 * Sends the form data to the server via a POST request and updates the `status` state based on the response.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 */
const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
        const response = await fetch("/api/send", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setStatus("success");
            setFormData({name: "", email: "", subject: "", message: ""});
        } else {
            setStatus("error");
        }
    } catch (error) {
        console.error("Error sending email:", error);
        setStatus("error");
    }
};

    return (
        <div className="flex flex-col space-y-16 md:space-y-24 px-4 md:px-8 lg:px-12 py-10 max-w-6xl mx-auto">
            {/* Intro Section */}
            <section className="text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {t.rich("title", {
                        br: () => <br/>
                    })}
                </h1>
            </section>

            {/* Contact Form and Image Section */}
            <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                <div className="w-full md:w-1/2">
                    <Image
                        src={contactImage}
                        alt="Contact banner"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg object-cover w-full h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder={t("namePlaceholder")}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t("emailPlaceholder")}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input w-full"
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder={t("subjectPlaceholder")}
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="input w-full"
                        />
                        <textarea
                            name="message"
                            placeholder={t("messagePlaceholder")}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="input w-full h-32"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="btn w-full"
                        >
                            {status === 'loading' ? t("sending") : t("send")}
                        </button>
                    </form>
                    {status === 'success' && (
                        <p className="text-green-500 mt-2">{t("successMessage")}</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-500 mt-2">{t("errorMessage")}</p>
                    )}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-lg font-medium">
                            {t("linkedin")}
                        </p>
                        <SocialBtn href="https://www.linkedin.com/in/jerome-greder/" target='_blank'
                                   className="btn-linkedin">
                            <BsLinkedin/>
                            Linkedin
                        </SocialBtn>
                    </div>
                </div>
            </section>
        </div>
    );
}
