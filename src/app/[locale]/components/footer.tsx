"use client";

import {useTranslations} from "use-intl";
import {Link} from "@/navigation";

const links = [
    {label: "home", href: "/"},
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
    {label: "contact", href: "/contact"},
]

const socialLinks = [
    {label: "github", href: "https://github.com/Glados1998"},
    {label: "linkedin", href: "https://www.linkedin.com/in/jerome-greder/"},
]
export default function Footer() {

    const t = useTranslations("components.Footer")

    return (
        <footer
            className={'bg-slate-200 p-6 backdrop-blur bg-white/50 md:sticky inset-x-0 bottom-0 z-10 dark:backdrop-blur-md dark:bg-slate-900/60'}>
            <div
                className={'grid grid-rows-2 gap-4 md:grid-rows-1 md:grid-flow-col auto-cols-max md:gap-10 ml-4 md:ml-10'}>

                {/* First Row - Main Content */}
                <div className={'grid grid-flow-row gap-3'}>
                    <span className={'font-bold text-md'}>Jérôme Greder web portfolio</span>
                    <span className={'font-medium text-sm'}>
                        © {new Date().getFullYear()} | {t("allRightsReserved")}
                    </span>
                    <span className={'font-medium text-sm'}>
                        {t("madeWith")} <a target={'_blank'} href={'https://nextjs.org'}
                                                        className={'text-blue-500 underline hover:no-underline'}>
                        Next.js</a> {t("hostedOn")} <a target={'_blank'} href={'https://vercel.com/'}
                                                                    className={'text-blue-500 underline hover:no-underline'}>Vercel</a></span>
                    <Link href={`legal`} className={'font-medium'}>{t("legal")}</Link>
                </div>

                {/* Second Row - Navigation and Social Links */}
                <div className={'grid grid-cols-2 gap-3 '}>
                    {/* Navigation Links */}
                    <div>
                        <h1 className={'text-md font-bold'}>
                            {t("navigationLabel")}
                        </h1>
                        <ul className={'grid grid-flow-row auto-rows-max'}>
                            {links.map(link => (
                                <li className={'font-medium'} key={link.label}>
                                    <Link
                                        href={`${link.href}`}>{t(`navigation.${link.label}`)}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h1 className={'text-md font-bold'}>
                            {t("socialLabel")}
                        </h1>
                        <ul className={'grid grid-flow-row auto-rows-max'}>
                            {socialLinks.map(link => (
                                <li className={'font-medium'} key={link.label}>
                                    <Link target={'_blank'}
                                          href={link.href}>{t(`social.${link.label}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
