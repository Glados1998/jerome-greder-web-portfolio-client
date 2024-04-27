import ProgrammingTag from "@/app/[lang]/components/programmingTag";
import {AiFillGithub} from "react-icons/ai";
import {MdWebAsset} from "react-icons/md";
import SocialBtn from "@/app/[lang]/components/SocialBtn";

export default function ProjectItem({projects, page}) {

    return (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 w-full md:w-[44rem]">
            <div className="flex flex-col text-left space-y-4 w-full md:w-[44rem]">
                <h2 className="text-3xl md:text-4xl font-bold">
                    {projects.title}
                </h2>
                <p className="text-base md:text-xl font-medium">
                    {projects.programming_tags.data?.map((technology, index) => (
                        <ProgrammingTag key={index} programmingTag={technology}/>
                    ))}
                </p>

                <div className="flex flex-col md:flex-row gap-6">
                    <div>
                        <p className="text-lg font-bold">
                            {page.projects.cta} :
                        </p>

                        <div className="flex gap-4 mt-2">
                            {projects.repoLink && (
                                <SocialBtn
                                    href={projects.repoLink}
                                    className="text-md md:text-lg font-semibold text-white bg-black p-1 rounded-md dark:text-slate-900 dark:bg-slate-200"
                                >
                                    <AiFillGithub/>
                                    Github
                                </SocialBtn>
                            )}
                            {projects.liveLink && (
                                <SocialBtn href={projects.liveLink}
                                   className="text-md md:text-lg font-semibold text-white bg-blue-600 p-1 rounded-md dark:text-slate-900 dark:bg-slate-200">
                                    <MdWebAsset/>
                                    Live
                                </SocialBtn>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}