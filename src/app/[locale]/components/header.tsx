"use client";

import LocaleSwitcher from "./locale-switcher";
import {Menu} from "@headlessui/react";
import {Fragment} from "react";
import {useTranslations} from "use-intl";
import {Link} from "@/navigation";


const links = [
    {label: "home", href: "/"},
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
    {label: "contact", href: "/contact"},
];

export default  function Header() {
    const t = useTranslations('components.Header');
    return (
        <header
            className="bg-slate-200 sticky top-0 md:p-2 p-3 backdrop-blur-md bg-white/60 z-10 dark:backdrop-blur-md dark:bg-slate-900/60">
            <nav className="flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold mr-10 ml-10">
                        JG.
                    </h1>

                    {/* Standard Navigation Links for larger screens */}
                    <ul className="hidden md:flex gap-6">
                        {links.map((link) => (
                            <li className="font-medium" key={link.label}>
                                <Link href={`${link.href}`}>
                                    {t(link.label)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Dropdown Menu for smaller screens */}
                <Menu as="div" className="md:hidden relative">
                    <Menu.Button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"/>
                        </svg>
                    </Menu.Button>
                    <Menu.Items
                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {links.map((link) => (
                            <Menu.Item as={Fragment} key={link.label}>
                                {({active}) => (
                                    <Link href={`/${link.href}`}
                                          className={"font-medium block px-4 py-2 text-sm dark:hover:bg-slate-700 hover:bg-slate-200"}>
                                        {t(link.label)}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                        <Menu.Item as={Fragment}>
{/*
                            <LocaleSwitcher/>
*/}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>

                <div className="hidden md:flex items-center mr-10">
                    <span className={'font-medium mr-4'}>
                        {t('language')} :&nbsp;
                    </span>
                    <div>
{/*
                        <LocaleSwitcher/>
*/}
                    </div>
                </div>
            </nav>
        </header>
    );
}
