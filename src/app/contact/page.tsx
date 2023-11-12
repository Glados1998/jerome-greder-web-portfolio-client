import contactImage from "../../assets/images/contact-banner.jpg";
import Image from "next/image";
import {BsLinkedin} from "react-icons/bs";

export default function Contact() {
    return (
        <>
            <div className={'relative px-5 md:px-20 lg:px-40 py-10'}>
                <div className={'flex flex-row gap-6 md:gap-20'}>
                    <Image src={contactImage} alt="Contact banner" width={400} height={400}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full md:w-[44rem]">
                        <h2 className="text-5xl md:text-5xl font-bold">
                            Contact me, and let's make something great together!
                        </h2>
                        <p className="text-base md:text-xl font-medium">
                            You can contact me by email at <a href={'mailto:jerome-alexandre.greder@epitech.eu'}
                                                              className={'font-medium hover:underline'}>
                            jerome-alexandre.greder@epitech.eu
                        </a> or by phone at <a href={'tel:+33 7 84 25 06 10'} className={'font-medium hover:underline'}>
                            +33 7 84 25 06 10
                        </a>
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <p className="text-base md:text-xl font-medium">
                                Feel free to reach out to me on LinkedIn.
                            </p>
                            <a href="https://www.linkedin.com/in/jerome-greder/" target={'_blank'}
                               className="text-4xl text-blue-600 dark:text-white">
                                <BsLinkedin/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
