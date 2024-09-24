"use client"
import Image from 'next/image'
import homeBanner from 'src/app/[locale]/assets/images/heroBanner.jpg'
import minimal from 'src/app/[locale]/assets/images/minimal.jpg'
import passion from 'src/app/[locale]/assets/images/passion.jpg'
import {useTranslations} from "use-intl";
import {Link} from "@/navigation";

const links = [
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
];

export default function Home() {
    const t = useTranslations('page.Index');

    return (
        <>
            <div className={'flex flex-col justify-center m-6 md:m-12'}>

                <div className="md:left-16 md:top-14 w-fit flex flex-col justify-center items-start p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold">
                        {t.rich("title", {
                            span: (children) => <span className="text-blue-500 dark:text-white">{children}</span>,
                            br: () => <br/>
                        })}
                    </h1>
                    <p className="text-sm md:text-xl lg:text-2xl xl:text-4xl mt-4 md:mt-4 lg:mt-8 xl:mt-8 font-medium">
                        {t("webDev")}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 md:mt-12 ">
                        {links.map((link) => (
                            <Link href={`/${link.href}`} key={link.label}
                                  className="btn">
                                {t(`buttonsLabel.${link.label}`)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col justify-center m-6 md:m-12 '}>
                <div className={'flex flex-col justify-center items-center '}>
                    <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6 md:w-[30rem] text-center'}>{t("subTitle")}</h1>
                    <p className={'text-sm md:text-base w-30 md:w-[50rem] text-center break-words'}>{t("subDescription")}<a
                        target={'_blank'} href={'https://www.epitech.eu/'}
                        className={'font-medium hover:underline'}>{t("epitech")}</a>.
                    </p>
                </div>
            </div>
            <div className={'flex flex-col md:flex-row gap-12 justify-evenly m-6 md:m-12 text-center'}>

            </div>
            <div className={'flex flex-col justify-center m-6 md:m-12 '}>
                <div className={'flex flex-col justify-center items-center '}>
                    <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6 md:w-[30rem] text-center'}>{t("contact.title")}</h1>
                    <p className={'text-sm md:text-base w-30 md:w-[50rem] text-center'}>{t("contact.description")}</p>
                </div>
                <div className={'mt-4 md:mt-6 flex justify-center'}>
                    <Link href={`/contact`}
                          className={'btn'}>
                        {t("contact.cta")}
                    </Link>
                </div>
            </div>
        </>
    )
}
