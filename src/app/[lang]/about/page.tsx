import Image from 'next/image';
import headshot from 'src/app/[lang]/assets/images/profile-image1.jpg';
import epitechBanner from 'src/app/[lang]/assets/images/epitech-banner.jpg';
import {BsLinkedin} from "react-icons/bs";
import {AiFillGithub} from "react-icons/ai";
import {Locale} from "../../../../i18.donfig";
import {getDictionary} from "../../../../lib/dictionary";
import ProgrammingTag from "@/app/[lang]/components/programmingTag";
import getTags from "../../../../utils/getTags";

export default async function About({params: {lang}}: {params: { lang: Locale }}) {

    const {page} = await getDictionary(lang)
    const tags = await getTags()
    return (
        <>
            <div className="relative px-5 md:px-20 lg:px-40 py-10">
                {/* Intro Section */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
                        {page.About.title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-4xl font-medium mt-4">
                        {page.About.subTitle}
                    </p>
                    <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-6 md:gap-20">
                    <Image src={headshot} alt="Jérôme Greder" width={300} height={300}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full md:w-[44rem]">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Jérôme Greder
                        </h2>
                        <p className="text-base md:text-xl font-medium">
                            {page.About.profile.descriptionOne}
                        </p>
                        <p className="text-base md:text-xl font-medium">
                            {page.About.profile.descriptionTwo}
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div>
                                <p className="text-lg font-bold">
                                    {page.About.cta}:
                                </p>
                                <div className="flex gap-4 mt-2">
                                    <a href="https://www.linkedin.com/in/jerome-greder/" target={'_blank'}
                                       className="text-4xl text-blue-600 dark:text-white">
                                        <BsLinkedin/>
                                    </a>
                                    <a href="https://github.com/Glados1998" target={'_blank'}
                                       className="text-4xl text-gray-600 dark:text-white">
                                        <AiFillGithub/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-20">
                    <div className="text-left">
                        <h1 className="text-3xl md:text-5xl font-bold">{page.About.educationLabel}</h1>
                        <hr className="mt-4 w-20 border-black dark:border-white"/>
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly items-center mt-10 gap-6 md:gap-10">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-2xl md:text-4xl font-bold">{page.About.education.epitech}</h2>
                            <p className="text-lg md:text-2xl font-medium">{page.About.education.subheading}</p>
                            <p className="text-base md:text-xl font-medium">
                                {page.About.education.description}
                            </p>
                            <div className="space-y-2">
                                <h2 className="text-lg md:text-xl font-bold">{page.About.ctaSchool}:</h2>
                                <div className="flex gap-5">
                                    <a href="https://www.webacademie.org/" target={'_blank'}
                                       className="bg-slate-200 font-semibold hover:bg-slate-800 px-2 py-1 rounded-md text-sm md:text-base text-black hover:text-white transition duration-300 ease-in-out">
                                        Web@cadémie
                                    </a>
                                    <a href="https://www.epitech.eu" target={'_blank'}
                                       className="bg-slate-200 font-semibold hover:bg-slate-800 px-2 py-1 rounded-md text-sm md:text-base text-black hover:text-white transition duration-300 ease-in-out">
                                        Epitech
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Image src={epitechBanner} alt="Epitech school" width={800} height={300}
                               className="rounded-2xl shadow-lg"/>
                    </div>
                </div>

                {/* Stack Section */}
                <div className="mt-20">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-5xl font-bold">{page.About.techStack}</h1>
                        <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <div className="w-[50rem] max-w-full flex flex-wrap justify-center items-center gap-4">
                            {tags.tags.data.map((tech) => {
                                return (
                                    <ProgrammingTag key={tech.id} programmingTag={tech}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
