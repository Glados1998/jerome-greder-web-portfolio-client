import Image from 'next/image';
import headshot from '../../assets/images/profile-image1.jpg';
import epitechBanner from '../../assets/images/epitech-banner.jpg';
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

export default function About() {
    return (
        <>
            <div className="relative px-5 md:px-20 lg:px-40 py-10">
                {/* Intro Section */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
                        About Me
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-4xl font-medium mt-4">
                        Glad you could make it!
                    </p>
                    <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-6 md:gap-20">
                    <Image src={headshot} alt="Jérôme Greder" width={300} height={300} className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full md:w-[44rem]">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Jérôme Greder
                        </h2>
                        <p className="text-base md:text-xl font-medium">
                            A devoted learner and tech enthusiast. I craft aesthetically pleasing and functional websites and applications, leveraging the power of React & Angular, and constructing robust APIs with Node.js and Express.
                        </p>
                        <p className="text-base md:text-xl font-medium">
                            Seeking new opportunities as a Junior Fullstack or Frontend developer. Keen on advancing my skills and growing professionally. Eager to contribute with the teams I wish to work with.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div>
                                <p className="text-lg font-bold">
                                    Check me out on:
                                </p>
                                <div className="flex gap-4 mt-2">
                                    <a href="https://www.linkedin.com/in/jgreder/" target={'_blank'} className="text-2xl text-blue-600">
                                        <BsLinkedin />
                                    </a>
                                    <a href="https://github.com/jgreder" target={'_blank'} className="text-2xl text-gray-600">
                                        <AiFillGithub />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-bold">
                                    Download my resume:
                                </p>
                                <div className="mt-2">
                                    <select className="form-select block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 transition ease-in-out">
                                        <option value="">Select language</option>
                                        <option value="CV_English.pdf">English (PDF)</option>
                                        <option value="CV_French.pdf">Français (PDF)</option>
                                        <option value="CV_German.pdf">Deutsch (PDF)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-20">
                    <div className="text-left">
                        <h1 className="text-3xl md:text-5xl font-bold">My Education</h1>
                        <hr className="mt-4 w-20 border-black dark:border-white"/>
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly items-center mt-10 gap-6 md:gap-10">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-2xl md:text-4xl font-bold">Web@cademie by Epitech</h2>
                            <p className="text-lg md:text-2xl font-medium">Brave New World</p>
                            <p className="text-base md:text-xl font-medium">
                                Valedictorian from the Web@cademie 2023, powered by Epitech. <br/>
                                The program targets aspiring web developers,
                                offering comprehensive training in modern web technologies and practices.
                            </p>
                            <div className="space-y-2">
                                <h2 className="text-lg md:text-xl font-bold">Learn More About My School:</h2>
                                <div className="flex gap-4">
                                    <a href="https://www.webacademie.org/" target={'_blank'} className="bg-slate-200 hover:bg-slate-800 px-2 py-1 rounded-md text-sm md:text-base text-black hover:text-white transition duration-300 ease-in-out">
                                        Web@cademie
                                    </a>
                                    <a href="https://www.epitech.eu/en/" target={'_blank'} className="bg-slate-200 hover:bg-slate-800 px-2 py-1 rounded-md text-sm md:text-base text-black hover:text-white transition duration-300 ease-in-out">
                                        Epitech
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Image src={epitechBanner} alt="Epitech school" width={800} height={300} className="rounded-2xl shadow-lg"/>
                    </div>
                </div>
            </div>
        </>
    );
}
