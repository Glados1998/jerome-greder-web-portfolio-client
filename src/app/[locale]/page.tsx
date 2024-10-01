"use client"
import minimal from 'src/app/[locale]/assets/images/minimal.jpg'
import passion from 'src/app/[locale]/assets/images/passion.jpg'
import Transparency from 'src/app/[locale]/assets/images/luca-bravo-9l_326FISzk-unsplash.jpg'
import Innovation from'src/app/[locale]/assets/images/BL03-blanck.png'
import CMS from 'src/app/[locale]/assets/images/brian-mcgowan-xKnXRV36fEY-unsplash.jpg'
import Website from 'src/app/[locale]/assets/images/blake-connally-B3l0g6HLxr8-unsplash.jpg'
import Hosting from 'src/app/[locale]/assets/images/stephen-phillips-hostreviews-co-uk-tN344soypQM-unsplash.jpg'
import {useTranslations} from "use-intl";
import {Link} from "@/navigation";
import CardImage from "@/app/[locale]/components/cardImage";

const links = [
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
];

const values: CardsInterface[] = [
    {
        image: passion,
        alt: "Passion",
        title: "coding.title",
        description: "coding.description",
        color: "text-white"
    },
    {
        image: minimal,
        alt: "Minimal",
        title: "minimalism.title",
        description: "minimalism.description",
        color: "text-black"
    },
    {
        image: Transparency,
        alt: "Transparency",
        title: "Transparency.title",
        description: "Transparency.description",
        color: "text-white"
    },
    {
        image: Innovation,
        alt: "Innovation",
        title: "Innovation.title",
        description: "Innovation.description",
        color: "text-white"
    },
]

const services: CardsInterface[] = [
    {
        image: CMS,
        alt: "Cms",
        title: "CmsService.title",
        description: "CmsService.description",
        color: "text-white"
    },
    {
        image: Website,
        alt: "Websites",
        title: "WebsitesService.title",
        description: "WebsitesService.description",
        color: "text-white"
    },
    {
        image: Hosting,
        alt: "Hosting",
        title: "HostingService.title",
        description: "HostingService.description",
        color: "text-white"
    }
]

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
                    <p className="text-md md:text-xl lg:text-2xl xl:text-4xl mt-4 md:mt-4 lg:mt-8 xl:mt-8 font-medium">
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
            <div>
                <div className={"ml-8 lg:ml-20 mb-4 pt-6 "}>
                    <h3 className={"text-3xl lg:text-4xl font-bold"}>
                        {t("values")}. <span className={"text-blue-500 dark:text-white"}>{t("valuesSpan")}</span>
                    </h3>
                </div>
                <div className={"overflow-x-scroll"}>
                    <div className={"inline-flex pb-10 pt-2.5 w-full align-top ltr"}>
                        {values.map((item, index) => (
                            <CardImage key={index} cardData={item} t={t}/>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className={"ml-8 lg:ml-20 mb-4 pt-6"}>
                    <h3 className={"text-3xl lg:text-4xl font-bold"}>
                        {t("services")}. <span className={"text-blue-500 dark:text-white"}> {t("servicesSpan")}</span>
                    </h3>
                </div>
                <div className={"overflow-x-scroll"}>
                    <div className={"inline-flex pb-10 pt-2.5 w-full align-top ltr"}>
                        {services.map((item, index) => (
                            <CardImage key={index} cardData={item} t={t}/>
                        ))}
                    </div>
                </div>
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
