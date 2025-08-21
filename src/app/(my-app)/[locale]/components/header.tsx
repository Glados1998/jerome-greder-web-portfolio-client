"use client";

import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "use-intl";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const links = [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
];

export default function Header() {
    const t = useTranslations('components.Header');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for dropdown menu

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-10 transition-all duration-300 ${
                scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="mr-4">
                        <img
                            src="/jgpixel-black.svg"
                            width={150}
                            height={150}
                            alt="jg pixel logo"
                            className="block dark:hidden w-24 h-auto md:w-32"
                        />
                        <img
                            src="/jgpixel-white.svg"
                            width={150}
                            height={150}
                            alt="jg pixel logo"
                            className="hidden dark:block w-24 h-auto md:w-32"
                        />
                    </Link>
                    <ul className="hidden md:flex gap-6">
                        {links.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="font-medium hover:text-blue-500 transition-colors">
                                    {t(link.label)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <span className="font-medium">{t('language')}:</span>
                    <LocaleSwitcher />
                </div>

                {/* Mobile menu using shadcn/ui dropdown */}
                <div className="md:hidden relative">
                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <button className="z-20" onClick={() => setMenuOpen(!menuOpen)}>
                                {menuOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-900 rounded-md shadow-lg focus:outline-none">
                            <div className="px-1 py-1">
                                {links.map((link) => (
                                    <DropdownMenuItem key={link.label} asChild>
                                        <Link
                                            href={link.href}
                                            className="font-medium hover:text-blue-500 transition-colors w-full block"
                                            onClick={() => setMenuOpen(false)} // Close menu on link click
                                        >
                                            {t(link.label)}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator className={"mx-3"} />
                                <DropdownMenuLabel>
                                    <span className="font-medium block mb-2">{t('language')}:</span>
                                    <LocaleSwitcher />
                                </DropdownMenuLabel>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    );
}
