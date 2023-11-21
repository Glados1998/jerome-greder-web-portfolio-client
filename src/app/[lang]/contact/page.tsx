import contactImage from "src/app/[lang]/assets/images/contact-banner.jpg";
import Image from "next/image";
import {BsLinkedin} from "react-icons/bs";
import {Locale} from "../../../../i18.donfig";
import {getDictionary} from "../../../../lib/dictionary";

export default async function Contact({params: {lang}}: { params: { lang: Locale }}) {
    const {page} = await getDictionary(lang)
    return (
        <>
            <div className='relative px-5 md:px-20 lg:px-40 py-10 mb-40'>
                <div className='flex flex-col md:flex-row gap-6 md:gap-20'>
                    <Image src={contactImage} alt="Contact banner" width={400} height={400} className="rounded-2xl shadow-lg"/>
                    <div className="flex flex-col text-left space-y-4 w-full">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            {page.Contact.title}
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-bold w-[50rem]">
                            {page.Contact.subTitle}
                        </h2>
                        <p className="text-sm md:text-3xl font-medium">
                            {page.Contact.contactMeAt} <a href='mailto:jerome-alexandre.greder@epitech.eu' className='font-medium hover:underline'>
                            jerome-alexandre.greder@epitech.eu
                        </a> & <a href='mailto:j.greder@staro.ch' className='font-medium hover:underline'>
                            j.greder@staro.ch
                        </a> {page.Contact.orBy} {page.Contact.phone} {page.Contact.at} <a href='tel:+33 7 84 25 06 10' className='font-medium hover:underline'>
                            +33 7 84 25 06 10
                        </a>
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 absolute bottom-16">
                            <p className="text-sm md:text-3xl font-medium">
                                {page.Contact.linkedin}.
                            </p>
                            <a href="https://www.linkedin.com/in/jerome-greder/" target='_blank' className="text-2xl md:text-4xl text-blue-600 dark:text-white">
                                <BsLinkedin/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
