import { AiFillGithub } from "react-icons/ai";
import { MdWebAsset } from "react-icons/md";
import projects from "@/data/projects";

export default function Projects() {
    return (
        <>
            <div className="relative px-5 md:px-20 lg:px-40 py-10">
                {/* Intro Section */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
                        my projects
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-4xl font-medium mt-4">
                        Here are some of the projects I&apos;ve been working on <br/>
                        over time.
                    </p>
                    <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                </div>

                {/* Project Section */}
                <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-6 md:gap-20">
                    {projects.map((project, index) => (
                        <div key={index}
                             className="flex flex-col md:flex-row items-center justify-center space-y-4 w-full md:w-[44rem]">
                            <div className="flex flex-col text-left space-y-4 w-full md:w-[44rem]">
                                <h2 className="text-3xl md:text-4xl font-bold">
                                    {project.name}
                                </h2>
                                <p className="text-base md:text-xl font-medium">
                                    {project.description}
                                </p>
                                <p className="text-base md:text-xl font-medium">
                                    {project.technologies?.map((technology, techIndex) => (
                                        <span key={techIndex}
                                              className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {technology.label}
                                        </span>
                                    ))}
                                </p>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <div>
                                        <p className="text-lg font-bold">
                                            Check it out on:
                                        </p>

                                        <div className="flex gap-4 mt-2">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                   className="text-3xl text-gray-600 dark:text-white">
                                                    <AiFillGithub/>
                                                </a>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                                   className="text-3xl text-blue-600 dark:text-white">
                                                    <MdWebAsset/>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
