"use client";

import LocaleSwitcher from "./locale-switcher";
import { Menu, Transition } from "@headlessui/react";
import { useTranslations } from "use-intl";
import { Link } from "@/i18n/routing";
import { Fragment, useState, useEffect } from "react";

const links = [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
];

export default function Header() {
    const t = useTranslations('components.Header');
    const [scrolled, setScrolled] = useState(false);

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

                {/* Mobile menu */}
                <Menu as="div" className="md:hidden relative">
                    {({ open }) => (
                        <>
                            <Menu.Button className="z-20">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    {open ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    )}
                                </svg>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1">
                                        {links.map((link) => (
                                            <Menu.Item key={link.label}>
                                                {({ active }) => (
                                                    <Link
                                                        href={link.href}
                                                        className={`${
                                                            active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white'
                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    >
                                                        {t(link.label)}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        <Menu.Item>
                                            <div className="px-2 py-2">
                                                <span className="font-medium block mb-2">{t('language')}:</span>
                                                <LocaleSwitcher />
                                            </div>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </nav>
        </header>
    );
}
