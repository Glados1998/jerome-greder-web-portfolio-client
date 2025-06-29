"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import axios from "axios";
import ProjectItem from "@/app/(my-app)/[locale]/components/projectItem";
import {getLocaleFromURL} from "@/utils/localeUtils";

export default function Projects() {
    const t = useTranslations("page.projects")
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

        setIsLoading(true);
        axios.get(`${apiUrl}/project/?locale=${locale}&fallback-locale=en`)
            .then(response => {
                setProjects(response.data.docs)
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setIsLoading(false);
            });
    }, [locale]);

    return (
        <div className="flex flex-col space-y-16 md:space-y-24 px-4 md:px-8 lg:px-12 py-10 max-w-8xl mx-auto">
            {/* Intro Section */}
            <section className="text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {t("title")}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                    {t("subTitle")}
                </p>
            </section>

            {/* Project Section */}
            <section className="w-full">
                {isLoading ? (
                    <div className="text-center">
                        <p className="text-xl">Loading projects...</p>
                    </div>
                ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectItem key={index} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-xl">{t("noProjects")}</p>
                    </div>
                )}
            </section>
        </div>
    )
}
