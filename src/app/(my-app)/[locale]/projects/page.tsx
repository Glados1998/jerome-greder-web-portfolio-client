"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import axios from "axios";
import ProjectItem from "@/app/(my-app)/[locale]/components/projectItem";

export default function Projects() {
    const t = useTranslations("page.projects")
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

                {/* Project Section */}
                <div className="flex flex-wrap mt-10 gap-12 justify-start">
                    {
                        projects.map((project, index) => (
                            <ProjectItem key={index} projects={project}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
