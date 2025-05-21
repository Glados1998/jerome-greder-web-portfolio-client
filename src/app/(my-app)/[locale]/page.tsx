"use client"

import {useTranslations} from "use-intl";
import {Link} from "@/i18n/routing";
import CardImage from "@/app/(my-app)/[locale]/components/cardImage";
import {useEffect, useState} from "react";
import axios from "axios";
import {getLocaleFromURL} from "@/utils/localeUtils";

const links = [
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
];

export default function Home() {
    const t = useTranslations('page.Index');

    const [servicesData, setServicesData] = useState([]);
    const [valuesData, setValuesData] = useState([]);
    const [locale, setLocale] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentLocale = getLocaleFromURL(window.location.href);
            setLocale(currentLocale);
        }
    }, []);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            console.error('API URL is not defined in environment variables');
            return;
        }

        if (locale) {
            axios.get(`${apiUrl}/values/?locale=${locale}`).then(response => {
                setValuesData(response.data.docs)
                console.log(response.data.docs)
            }).catch(error => {
                console.error('Error fetching values:', error);
            });

            axios.get(`${apiUrl}/services/?locale=${locale}`).then(response => {
                setServicesData(response.data.docs)
                console.log(response.data.docs)
            }).catch(error => {
                console.error('Error fetching services:', error);
            });
        }
    }, [locale]);

    return (
        <div className="flex flex-col space-y-16 md:space-y-24">
            {/* Hero Section */}
            <section className="px-4 md:px-8 lg:px-12 pt-8 md:pt-16">
                <div className="max-w-5xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                        {t.rich("title", {
                            span: (children) => <span className="text-blue-500 dark:text-white">{children}</span>,
                            br: () => <br/>
                        })}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8">
                        {t("webDev")}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {links.map((link) => (
                            <Link href={`/${link.href}`} key={link.label} className="btn">
                                {t(`buttonsLabel.${link.label}`)}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="px-4 md:px-8 lg:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("subTitle")}</h2>
                    <p className="text-base md:text-lg">
                        {t("subDescription")}
                        <a target="_blank" href="https://www.epitech.eu/" className="font-medium hover:underline">
                            {t("epitech")}
                        </a>.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="px-4 md:px-8 lg:px-12">
                <div className="max-w-full">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        {t("values")}. <span className="text-blue-500 dark:text-white text-xl md:text-2xl">{t("valuesSpan")}</span>
                    </h2>
                    <div className="overflow-x-auto">
                        <div className="inline-flex space-x-6 pb-6">
                            {valuesData.map((item, index) => (
                                <CardImage key={index} cardData={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="px-4 md:px-8 lg:px-12">
                <div className="max-w-full">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        {t("services")}. <span className="text-blue-500 dark:text-white text-xl md:text-2xl">{t("servicesSpan")}</span>
                    </h2>
                    <div className="overflow-x-auto">
                        <div className="inline-flex space-x-6 pb-6">
                            {servicesData.map((item, index) => (
                                <CardImage key={index} cardData={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="px-4 md:px-8 lg:px-12 pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("contact.title")}</h2>
                    <p className="text-base md:text-lg mb-8">{t("contact.description")}</p>
                    <Link href="/contact" className="btn inline-block">
                        {t("contact.cta")}
                    </Link>
                </div>
            </section>
        </div>
    )
}
