import contactImage from "src/app/[lang]/assets/images/contact-banner.jpg";
import Image from "next/image";
import {BsLinkedin} from "react-icons/bs";
import {Locale} from "../../../../i18.donfig";
import {getDictionary} from "../../../../lib/dictionary";
import SocialBtn from "@/app/[lang]/components/SocialBtn";

export default async function Contact({params: {lang}}: { params: { lang: Locale } }) {
    const {page} = await getDictionary(lang)
    return (
        <>
            <div className='relative px-5 md:px-20 lg:px-40 py-10 mb-40'>
                <div className='flex flex-col md:flex-row gap-6 md:gap-20'>
                    <Image src={contactImage} alt="Contact banner" width={400} height={400}
                           className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full">
                        <h2 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                            {page.Contact.title}
                        </h2>
                        <h2 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                            {page.Contact.subTitle}
                        </h2>
                        <p className="text-sm md:text-2xl font-medium">
                            {page.Contact.contactMeAt} <a href='mailto:jerome-alexandre.greder@epitech.eu'
                                                          className='font-medium hover:underline'>
                            jerome-alexandre.greder@epitech.eu
                        </a> & <a href='mailto:j.greder@staro.ch' className='font-medium hover:underline'>
                            j.greder@staro.ch
                        </a> {page.Contact.orBy} {page.Contact.phone} {page.Contact.at} <a href='tel:+33 7 84 25 06 10'
                                                                                           className='font-medium hover:underline'>
                            +33 7 84 25 06 10
                        </a>
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 ">
                            <p className="text-sm md:text-2xl font-medium">
                                {page.Contact.linkedin}.
                            </p>
                            <SocialBtn href="https://www.linkedin.com/in/jerome-greder/" target='_blank'
                               className="text-md md:text-lg font-semibold text-white bg-blue-600 p-1 rounded-md dark:text-slate-900 dark:bg-slate-200">
                                <BsLinkedin/>
                                Linkedin
                            </SocialBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
