"use client";

import { useTranslations } from "use-intl";
import { Link } from "@/i18n/routing";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { SiNextdotjs, SiVercel, SiPayloadcms } from "react-icons/si";

const links = [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
    { label: "admin", href: "/admin" },
];

const socialLinks = [
    { label: "github", href: "https://github.com/Glados1998" },
    { label: "linkedin", href: "https://www.linkedin.com/in/jerome-greder/" },
];

export default function Footer() {
    const t = useTranslations("components.Footer");
    const router = useRouter();

    return (
        <footer className="bg-slate-200 p-6 backdrop-blur-xs bg-white/50 dark:backdrop-blur-md dark:bg-slate-900/60">
            <div className="container mx-auto">
                <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-12">
                    {/* Main Content */}
                    <div className="flex flex-col space-y-2">
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
                        <span className="font-bold text-md">Jérôme Greder | JG Pixel</span>
                        <span className="font-medium text-sm">
                            © {new Date().getFullYear()} | {t("allRightsReserved")}
                        </span>
                        <span className="font-medium text-sm flex items-center space-x-1">
                            <span>{t("madeWith")}</span>
                            <a 
                                href="https://nextjs.org" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline inline-flex items-center"
                            >
                                <SiNextdotjs className="mr-1" />
                                Next.js
                            </a>
                            <span>{t("hostedOn")}</span>
                            <a 
                                href="https://vercel.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline inline-flex items-center"
                            >
                                <SiVercel className="mr-1" />
                                Vercel
                            </a>
                        </span>
                        <span className="font-medium text-sm flex items-center space-x-1">
                            <span>{t("poweredBy")}</span>
                            <a 
                                href="https://payloadcms.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline inline-flex items-center"
                            >
                                <SiPayloadcms className="mr-1" />
                                Payload CMS
                            </a>
                        </span>
                        <Link href="/legal" className="font-medium text-sm">{t("legal")}</Link>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h2 className="text-md font-bold mb-2">{t("navigationLabel")}</h2>
                        <ul className="space-y-1">
                            {links.map(link => (
                                <li className="font-medium" key={link.label}>
                                    {link.label === 'admin' ? (
                                        <Link href="/admin" onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/admin');
                                        }}>
                                            {t(`navigation.${link.label}`)}
                                        </Link>
                                    ) : (
                                        <Link href={link.href}>{t(`navigation.${link.label}`)}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h2 className="text-md font-bold mb-2">{t("socialLabel")}</h2>
                        <ul className="space-y-1">
                            {socialLinks.map(link => (
                                <li className="font-medium" key={link.label}>
                                    <Link target="_blank" href={link.href}>
                                        {t(`social.${link.label}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
