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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;

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
        <>
            <div className={'flex flex-col justify-center m-6 md:m-12'}>

                <div className="md:left-16 md:top-14 w-fit flex flex-col justify-center items-start p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold">
                        {t.rich("title", {
                            span: (children) => <span className="text-blue-500 dark:text-white">{children}</span>,
                            br: () => <br/>
                        })}
                    </h1>
                    <p className="text-md md:text-xl lg:text-2xl xl:text-4xl mt-4 md:mt-4 lg:mt-8 xl:mt-8 font-medium">
                        {t("webDev")}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 md:mt-12 ">
                        {links.map((link) => (
                            <Link href={`/${link.href}`} key={link.label}
                                  className="btn">
                                {t(`buttonsLabel.${link.label}`)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col justify-center m-6 md:m-12 '}>
                <div className={'flex flex-col justify-center items-center '}>
                    <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6 md:w-[30rem] text-center'}>{t("subTitle")}</h1>
                    <p className={'text-sm md:text-base w-30 md:w-[50rem] text-center break-words'}>{t("subDescription")}<a
                        target={'_blank'} href={'https://www.epitech.eu/'}
                        className={'font-medium hover:underline'}>{t("epitech")}</a>.
                    </p>
                </div>
            </div>
            <div>
                <div className={"ml-8 lg:ml-20 mb-4 pt-6 "}>
                    <h3 className={"text-3xl lg:text-4xl font-bold"}>
                        {t("values")}. <span className={"text-blue-500 dark:text-white"}>{t("valuesSpan")}</span>
                    </h3>
                </div>
                <div className={"overflow-x-scroll"}>
                    <div className={"inline-flex pb-10 pt-2.5 w-full align-top ltr"}>
                        {valuesData.map((item, index) => (
                            <CardImage key={index} cardData={item}/>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className={"ml-8 lg:ml-20 mb-4 pt-6"}>
                    <h3 className={"text-3xl lg:text-4xl font-bold"}>
                        {t("services")}. <span className={"text-blue-500 dark:text-white"}> {t("servicesSpan")}</span>
                    </h3>
                </div>
                <div className={"overflow-x-scroll"}>
                    <div className={"inline-flex pb-10 pt-2.5 w-full align-top ltr"}>
                        {servicesData.map((item, index) => (
                            <CardImage key={index} cardData={item}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className={'flex flex-col justify-center m-6 md:m-12 '}>
                <div className={'flex flex-col justify-center items-center '}>
                    <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6 md:w-[30rem] text-center'}>{t("contact.title")}</h1>
                    <p className={'text-sm md:text-base w-30 md:w-[50rem] text-center'}>{t("contact.description")}</p>
                </div>
                <div className={'mt-4 md:mt-6 flex justify-center'}>
                    <Link href={`/contact`}
                          className={'btn'}>
                        {t("contact.cta")}
                    </Link>
                </div>
            </div>
        </>
    )
}
