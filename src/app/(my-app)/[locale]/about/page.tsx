"use client";
import Image from 'next/image';
import {useEffect, useState} from "react";
import headshot from '../assets/images/profile-image1.jpg';
import epitechBanner from '../assets/images/epitech-banner.jpg';
import {BsLinkedin} from "react-icons/bs";
import {AiFillGithub} from "react-icons/ai";
import {useTranslations} from "use-intl";
import axios from "axios";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";
import ProgrammingTag from "@/app/(my-app)/[locale]/components/programmingTag";

export default function About() {
    const t = useTranslations("page.About")
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error('API URL is not defined in environment variables');
            return;
        }
        axios.get(`${apiUrl}/programming-tag/?limit=30`).then(response => {
            setTags(response.data.docs)
        }).catch(error => {
            console.error('Error fetching tags:', error);
        });
    }, []);

    return (
        <>
            <div className="relative px-5 md:px-20 lg:px-40 py-10">
                {/* Intro Section */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                        {t("title")}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-2xl font-medium mt-4">
                        {t("subTitle")}
                    </p>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-6 md:gap-20">
                    <Image src={headshot} alt="Jérôme Greder" width={300} height={300}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full md:w-[44rem]">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Jérôme Greder
                        </h2>
                        <p className="text-base md:text-xl font-medium">
                            {t("profile.descriptionOne")}
                        </p>
                        <p className="text-base md:text-xl font-medium">
                            {t("profile.descriptionTwo")}
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div>
                                <p className="text-lg font-bold">
                                    {t("cta")}:
                                </p>
                                <div className="flex gap-4 mt-2">
                                    <SocialBtn href="https://www.linkedin.com/in/jerome-greder/"
                                               className="btn-linkedin">
                                        <BsLinkedin/>
                                        Linkedin
                                    </SocialBtn>
                                    <SocialBtn href="https://github.com/Glados1998"
                                               className="btn-github">
                                        <AiFillGithub/>
                                        Github
                                    </SocialBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-20">
                    <div className="text-left">
                        <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold">{t("educationLabel")}</h1>
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly items-center mt-10 gap-6 md:gap-10">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-2xl md:text-4xl font-bold">{t("education.epitech")}</h2>
                            <p className="text-lg md:text-2xl font-medium">{t("education.subheading")}</p>
                            <p className="text-base md:text-xl font-medium">
                                {t("education.description")}
                            </p>
                            <div className="space-y-2">
                                <h2 className="text-lg md:text-xl font-bold">{t("ctaSchool")}:</h2>
                                <div className="flex gap-5">
                                    <a href="https://www.webacademie.org/" target={'_blank'}
                                       className="btn">
                                        Web@cadémie
                                    </a>
                                    <a href="https://www.epitech.eu" target={'_blank'}
                                       className="btn">
                                        Epitech
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Image src={epitechBanner} alt="Epitech school" width={800} height={300}
                               className="rounded-2xl shadow-lg"/>
                    </div>
                </div>

                {/* Stack Section */}
                <div className="mt-20">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold">{t("techStack")}</h1>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <div className="w-[50rem] max-w-full flex flex-wrap justify-center items-center gap-4">
                            {
                                tags.map((tag, index) => (
                                    <ProgrammingTag key={index} programmingTag={tag}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
