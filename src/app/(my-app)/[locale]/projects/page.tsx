"use client";
import {useEffect, useState} from "react";
import {useTranslations} from "use-intl";
import axios from "axios";
import ProjectItem from "@/app/(my-app)/[locale]/components/projectItem";
import {getLocaleFromURL} from "@/utils/localeUtils";
import ProjectItemSkeleton from "@/app/(my-app)/[locale]/components/skeleton/projectItem-skeleton";

export default function Projects() {
    /**
     * React component logic for managing and fetching project data based on locale.
     *
     * This code includes:
     * - State management for projects, loading status, and locale.
     * - Effects for dynamically determining the locale and fetching project data from an API.
     */

    const t = useTranslations("page.projects"); // Hook for translations based on the current locale.
    const [projects, setProjects] = useState([]); // State to store the list of projects fetched from the API.
    const [isLoading, setIsLoading] = useState(true); // State to track whether the project data is being loaded.
    const [locale, setLocale] = useState<string | null>(null); // State to store the current locale.

    /**
     * Effect to determine the locale dynamically from the URL.
     * Runs only on the client side (checks for `window` availability).
     */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentLocale = getLocaleFromURL(window.location.href); // Extracts locale from the URL.
            setLocale(currentLocale); // Updates the locale state.
        }
    }, []);

    /**
     * Effect to fetch project data from the API based on the locale.
     * Runs whenever the `locale` changes.
     */
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL; // Determines the API URL from environment variables.
        if (!apiUrl) {
            console.error('API URL is not defined in environment variables'); // Logs an error if the API URL is not defined.
            return;
        }

        setIsLoading(true); // Sets loading state to true before fetching data.
        axios.get(`${apiUrl}/project/?locale=${locale}&fallback-locale=en&where[show_project][equals]=true`)
            .then(response => {
                setProjects(response.data.docs);
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {t("title")}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                    {t("subTitle")}
                </p>
            </section>

            {/* Project Section */}
            <section className="w-full">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({length: 6}).map((_, index) => (
                            <ProjectItemSkeleton key={index}/>
                        ))}
                    </div>
                ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectItem key={index} project={project}/>
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
