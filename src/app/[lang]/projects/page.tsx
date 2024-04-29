import {Locale} from "../../../../i18.donfig";
import {getDictionary} from "../../../../lib/dictionary";
import ProjectItem from "@/app/[lang]/components/projectItem";
import getWebProjects from "../../../../utils/getWebProjects";

export default async function Projects({params: {lang}}: { params: { lang: Locale } }) {
    const {page} = await getDictionary(lang)
    const projects = await getWebProjects()
    return (
        <>
            <div className="relative px-5 md:px-20 lg:px-40 py-10">
                {/* Intro Section */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                        {page.projects.title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-2xl font-medium mt-4">
                        {page.projects.subTitle}
                    </p>
                    <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                </div>

                {/* Project Section */}
                <div className="flex flex-wrap mt-10 gap-12">
                    {projects.projects.data.map((project, index) => (
                        <ProjectItem key={index} projects={project.attributes} page={page}/>
                    ))}
                </div>
            </div>
        </>
    )
}
