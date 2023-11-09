import Image from 'next/image'
import headshot from '../../assets/images/profile-image1.jpg'
import {BsLinkedin} from "react-icons/bs";
import {AiFillGithub} from "react-icons/ai";

export default function About() {
    return (
        <>
            <div className="relative">
                <div className="flex flex-col text-center m-40">
                    <h1 className="text-8xl font-bold">
                        About me
                    </h1>
                    <p className="text-4xl font-medium mt-8">
                        Glad you could make it!
                    </p>
                    <hr className="mt-12 w-20 mx-auto border-black dark:border-white"/>
                    <div className="flex flex-col md:flex-row items-center justify-center mt-24 gap-10 md:gap-20">
                        <Image src={headshot} alt="Jérôme Greder" width={300} height={300}
                               className="rounded-full shadow-lg"/>
                        <div className="flex flex-col text-left space-y-5 w-[40rem]">
                            <h2 className="text-4xl font-bold">
                                Jérôme Greder
                            </h2>
                            <p className="text-xl font-medium">
                                Valedictorian from the <a target="_blank" rel="noopener noreferrer"
                                                          href="https://www.webacademie.org/"
                                                          className="font-medium hover:underline text-blue-600">Web@cademie</a> 2023,
                                by <a target="_blank" rel="noopener noreferrer" href="https://www.epitech.eu/en/"
                                      className="font-medium hover:underline text-blue-600">Epitech</a>.
                            </p>
                            <p className="text-xl font-medium">
                                A devoted learner and tech enthusiast. <br/>
                                I excel in crafting aesthetically pleasing and functional websites and applications,
                                leveraging the power of React & Angular. <br/>
                                Or constructing robust APIs with Node.js and Express.
                            </p>
                            <p className="text-xl font-medium">
                                Seeking new opportunities as a Fullstack or Frontend developer. <br/>
                                I am keen on advancing my skills and growing professionally. <br/>
                                And contributing with the people I wish to work with.
                            </p>
                            <div className={'flex flex-col gap-2'}>
                                <p className="text-md font-medium">
                                    Check me out on:
                                </p>
                                <div className="mt-2 flex flex-row gap-4">
                                    <a target="_blank" rel="noopener noreferrer"
                                       href="https://www.linkedin.com/in/jgreder/"
                                       className="text-4xl text-blue-600">
                                        <BsLinkedin className="inline"/>
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer" href="
                                    https://github.com/jgreder"
                                       className="text-4xl text-blue-600">
                                        <AiFillGithub className="inline"/>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="text-md font-medium">
                                    Download my resume:
                                </p>
                                <div className="mt-2">
                                    <select
                                        className="form-select appearance-none block w-full md:w-fit px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm">
                                        <option value="">Select language</option>
                                        <option value="CV_English.pdf">English (PDF)</option>
                                        <option value="CV_French.pdf">French (PDF)</option>
                                        <option value="CV_German.pdf">German (PDF)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
