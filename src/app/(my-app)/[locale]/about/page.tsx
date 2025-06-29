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
/**
 * React logic for fetching and managing programming tags.
 *
 * This code includes:
 * - Translation handling using `useTranslations`.
 * - State management for programming tags.
 * - Effect for fetching programming tags from an API.
 */

const t = useTranslations("page.About"); // Hook for translations based on the current locale.

/**
 * State for storing programming tags fetched from the API.
 * @type {Array}
 */
const [tags, setTags] = useState([]);

/**
 * Effect to fetch programming tags from the API.
 * Executes a GET request to load tags included in the tech stack.
 * Runs only once when the component is mounted.
 */
useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL; // Determines the API URL from environment variables.

    if (!apiUrl) {
        console.error('API URL is not defined in environment variables'); // Logs an error if the API URL is missing.
        return;
    }

    // Fetch programming tags from the API.
    axios.get(`${apiUrl}/programming-tag/?limit=30&where[includeInStack][equals]=true`)
        .then(response => {
            setTags(response.data.docs); // Updates the state with fetched tags data.
        })
        .catch(error => {
            console.error('Error fetching tags:', error); // Logs errors during the fetch.
        });
}, []);

    return (
        <div className="flex flex-col space-y-16 md:space-y-24 px-4 md:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
            {/* Intro Section */}
            <section className="text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {t("title")}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                    {t("subTitle")}
                </p>
            </section>

            {/* Profile Section */}
            <section className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
                    <Image src={headshot} alt="Jérôme Greder" width={300} height={300}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col space-y-4 flex-grow">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                            Jérôme Greder
                        </h2>
                        <p className="text-base md:text-lg">
                            {t("profile.descriptionOne")}
                        </p>
                        <p className="text-base md:text-lg">
                            {t("profile.descriptionTwo")}
                        </p>
                        <div>
                            <p className="text-lg font-bold mb-2">
                                {t("cta")}:
                            </p>
                            <div className="flex gap-4">
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
            </section>

            {/* Education Section */}
            <section className="w-full">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">{t("educationLabel")}</h2>
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="space-y-4 flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold">{t("education.epitech")}</h3>
                        <p className="text-lg md:text-xl font-medium">{t("education.subheading")}</p>
                        <p className="text-base md:text-lg">
                            {t("education.description")}
                        </p>
                        <div>
                            <h4 className="text-lg font-bold mb-2">{t("ctaSchool")}:</h4>
                            <div className="flex gap-4">
                                <a href="https://www.webacademie.org/" target="_blank" rel="noopener noreferrer"
                                   className="btn">
                                    Web@cadémie
                                </a>
                                <a href="https://www.epitech.eu" target="_blank" rel="noopener noreferrer"
                                   className="btn">
                                    Epitech
                                </a>
                            </div>
                        </div>
                    </div>
                    <Image src={epitechBanner} alt="Epitech school" width={500} height={200}
                           className="rounded-2xl shadow-lg"/>
                </div>
            </section>

            {/* Stack Section */}
            <section className="w-full">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">{t("techStack")}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {tags.map((tag, index) => (
                        <ProgrammingTag key={index} programmingTag={tag}/>
                    ))}
                </div>
            </section>
        </div>
    );
}
