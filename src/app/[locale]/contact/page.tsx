"use client";
import contactImage from "src/app/[locale]/assets/images/contact-banner.jpg";
import Image from "next/image";
import {BsLinkedin} from "react-icons/bs";
import SocialBtn from "@/app/[locale]/components/SocialBtn";
import {useTranslations} from "use-intl";

export default function Contact() {
    const t = useTranslations("page.Contact")
    return (
        <>
            <div className='relative px-5 md:px-20 lg:px-40 py-10 mb-40'>
                <div className='flex flex-col md:flex-row gap-6 md:gap-20'>
                    <Image src={contactImage} alt="Contact banner" width={400} height={400}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full">
                        <h2 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                            {t("title")}
                        </h2>
                        <h2 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                            {t("subTitle")}
                        </h2>
                        <p className="text-sm md:text-2xl font-medium">
                            {t("contactMeAt")} <a href='mailto:jerome.greder@icloude.com'
                                                          className='font-medium underline hover:no-underline'>
                            jerome.greder@icloude.com
                        </a> {t("orBy")} {t("phone")} {t("at")} <br/>
                            <a href='tel:+33 7 84 25 06 10' className='font-medium underline hover:no-underline'>
                                +33 7 84 25 06 10
                            </a>
                        </p>
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
