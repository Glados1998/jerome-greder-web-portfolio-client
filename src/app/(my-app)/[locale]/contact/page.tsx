"use client";
import contactImage from "../assets/images/contact-banner.jpg";
import { useState } from "react";
import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";
import { useTranslations } from "use-intl";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";

export default function Contact() {
    const t = useTranslations("page.Contact")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            console.log(response);

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("error");
        }
    };

    return (
        <>
            <div className='relative px-5 md:px-20 lg:px-40 py-10 mb-40'>
                <div className='flex flex-col justify-around md:flex-row gap-6 md:gap-20'>
                    <Image src={contactImage} alt="Contact banner" width={450} height={500}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 justify-around">
                        <h2 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                            {t.rich("title", {
                                br: () => <br/>
                            })}
                        </h2>
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t("namePlaceholder")}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t("emailPlaceholder")}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder={t("subjectPlaceholder")}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                                <textarea
                                    name="message"
                                    placeholder={t("messagePlaceholder")}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="input h-32"
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn"
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
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 ">
                            <p className="text-sm md:text-2xl font-medium">
                                {t("linkedin")}.
                            </p>
                            <SocialBtn href="https://www.linkedin.com/in/jerome-greder/" target='_blank'
                                       className="btn-linkedin">
                                <BsLinkedin/>
                                Linkedin
                            </SocialBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
