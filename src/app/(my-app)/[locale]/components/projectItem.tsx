import {AiFillGithub} from "react-icons/ai";
import {MdWebAsset} from "react-icons/md";
import minimal from '../assets/images/minimal.jpg'
import Image from "next/image";
import {useTranslations} from "use-intl";
import ProgrammingTag from "@/app/(my-app)/[locale]/components/programmingTag";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";

export default function ProjectItem({projects}) {

    const t = useTranslations("page.projects")

    return (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4">
            <div className="flex flex-col text-left space-y-4">
                <Image src={projects.image ? projects.image.url : minimal} loading="lazy" alt="minimal" width={750} height={450}
                       className="shadow-lg rounded-md"/>
                <h2 className="text-3xl md:text-3xl font-bold">
                    {projects.title}
                </h2>
                <div className={'flex flex-wrap gap-3 mt-2 md:mt-8'}>
                    {projects.programming_tags?.map((technology, index) => (
                        <ProgrammingTag key={index} programmingTag={technology}/>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div>
                        <p className="text-lg font-bold">
                            {t("cta")} :
                        </p>

                        <div className="flex gap-4 mt-2">
                            {projects.github_link && (
                                <SocialBtn
                                    href={projects.github_link}
                                    className="btn-github">
                                    <AiFillGithub/>
                                    Github
                                </SocialBtn>
                            )}
                            {projects.live_link && (
                                <SocialBtn href={projects.live_link}
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
