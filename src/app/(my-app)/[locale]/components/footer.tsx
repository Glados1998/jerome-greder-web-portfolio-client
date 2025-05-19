"use client";

import {useTranslations} from "use-intl";
import {Link} from "@/i18n/routing";
import {useRouter} from 'next/navigation';
import Image from "next/image";

const links = [
    {label: "home", href: "/"},
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
    {label: "contact", href: "/contact"},
    {label: "admin", href: "/admin"},
]

const socialLinks = [
    {label: "github", href: "https://github.com/Glados1998"},
    {label: "linkedin", href: "https://www.linkedin.com/in/jerome-greder/"},
]
export default function Footer() {

    const t = useTranslations("components.Footer")
    const router = useRouter();

    return (
        <footer
            className={'bg-slate-200 p-6 backdrop-blur-xs bg-white/50 md:sticky inset-x-0 bottom-0 z-10 dark:backdrop-blur-md dark:bg-slate-900/60'}>
            <div
                className={'grid grid-rows-2 gap-4 md:grid-rows-1 md:grid-flow-col auto-cols-max md:gap-10 ml-4 md:ml-10'}>

                {/* First Row - Main Content */}
                <div className={'grid grid-flow-row gap-2 justify-start'}>
                    <div>
                        <Image
                            src="/x-icon-black.svg"
                            width={25}
                            height={25}
                            alt="jg pixel logo"
                            className="block dark:hidden"
                        />
                        <Image
                            src="/x-icon-white.svg"
                            width={25}
                            height={25}
                            alt="jg pixel logo"
                            className="hidden dark:block"
                        />
                    </div>
                    <span className={'font-bold text-md'}>Jérôme Greder | JG Pixel</span>
                    <span className={'font-medium text-sm'}>
                        © {new Date().getFullYear()} | {t("allRightsReserved")}
                    </span>
                    <span className={'font-medium text-sm'}>
                        {t("madeWith")} <a target={'_blank'} href={'https://nextjs.org'}
                                           className={'text-blue-500 underline hover:no-underline'}>
                        Next.js</a> {t("hostedOn")} <a target={'_blank'} href={'https://vercel.com/'}
                                                       className={'text-blue-500 underline hover:no-underline'}>Vercel</a></span>
                    <Link href={`/legal`} className={'font-medium text-sm'}>{t("legal")}</Link>
                </div>

                {/* Second Row - Navigation and Social Links */}
                <div className={'grid grid-cols-2 gap-12'}>
                    {/* Navigation Links */}
                    <div>
                        <h1 className={'text-md font-bold'}>
                            {t("navigationLabel")}
                        </h1>
                        <ul className={'grid grid-flow-row auto-rows-max'}>
                            {links.map(link => (
                                <li className={'font-medium'} key={link.label}>
                                    {link.label === 'admin' ? (
                                        <Link href="/admin" onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/admin');
                                        }}>
                                            {t(`navigation.${link.label}`)}
                                        </Link>
                                    ) : (
                                        <Link href={`${link.href}`}>{t(`navigation.${link.label}`)}</Link>
                                    )}
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
