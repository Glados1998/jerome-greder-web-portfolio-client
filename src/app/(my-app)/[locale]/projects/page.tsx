"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import axios from "axios";
import ProjectItem from "@/app/(my-app)/[locale]/components/projectItem";

export default function Projects() {
    const t = useTranslations("page.projects")
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error('API URL is not defined in environment variables');
            return;
        }

        axios.get(`${apiUrl}/project/`)
            .then(response => {
                setProjects(response.data.docs)
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Intro Section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {t("title")}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium">
                    {t("subTitle")}
                </p>
            </div>

            {/* Project Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} />
                ))}
            </div>
        </div>
    )
}
