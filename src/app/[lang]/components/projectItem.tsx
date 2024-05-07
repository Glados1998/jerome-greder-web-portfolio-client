import ProgrammingTag from "@/app/[lang]/components/programmingTag";
import {AiFillGithub} from "react-icons/ai";
import {MdWebAsset} from "react-icons/md";
import SocialBtn from "@/app/[lang]/components/SocialBtn";
import minimal from 'src/app/[lang]/assets/images/minimal.jpg'
import Image from "next/image";

export default function ProjectItem({projects, page}) {

    return (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4">
            <div className="flex flex-col text-left space-y-4">
                <Image src={projects.thumbnail.data ? projects.thumbnail.data.attributes.url : minimal} loading="lazy" alt="minimal" width={750} height={450}
                       className="shadow-lg"/>
                <h2 className="text-3xl md:text-3xl font-bold">
                    {projects.title}
                </h2>
                <div className={'flex flex-wrap gap-3 mt-2 md:mt-8'}>
                    {projects.programming_tags.data?.map((technology, index) => (
                        <ProgrammingTag key={index} programmingTag={technology}/>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div>
                        <p className="text-lg font-bold">
                            {page.projects.cta} :
                        </p>

                        <div className="flex gap-4 mt-2">
                            {projects.repoLink && (
                                <SocialBtn
                                    href={projects.repoLink}
                                    className="btn-github">
                                    <AiFillGithub/>
                                    Github
                                </SocialBtn>
                            )}
                            {projects.liveLink && (
                                <SocialBtn href={projects.liveLink}
                                   className="btn-live">
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