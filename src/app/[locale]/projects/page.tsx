"use client";
import {useEffect, useState} from "react";
import ProjectItem from "@/app/[locale]/components/projectItem";
import {useTranslations} from "use-intl";
import axios from "axios";

export default function Projects() {
    const t = useTranslations("page.projects")
    const [projects, setProjects] = useState({data: []});
    useEffect(() => {
        axios.get('https://strapi-production-739f.up.railway.app/api/projects?populate=*')
            .then(response => {
                setProjects(response.data)
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
                    <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                </div>

                {/* Project Section */}
                <div className="flex flex-wrap mt-10 gap-12 justify-start">
                    {
                        projects.data.map((project, index) => (
                            <ProjectItem key={index} projects={project.attributes}/>
                        ))}
                </div>
            </div>
        </>
    )
}
