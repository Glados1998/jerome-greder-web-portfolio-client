"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getLocaleFromURL } from "@/utils/localeUtils";

const locales = [
    { label: "EN", locale: 'en' },
    { label: "DE", locale: 'de' },
    { label: "FR", locale: 'fr' },
];

export default function LocaleSwitcher() {
    const pathName = usePathname();
    const [currentLocale, setCurrentLocale] = useState(locales[0]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const detectedLocale = getLocaleFromURL(window.location.href);
            const matchedLocale = locales.find(loc => loc.locale === detectedLocale) || locales[0];
            setCurrentLocale(matchedLocale);
        }
    }, [pathName]);

    return (
        <>
            {/* Mobile view */}
            <ul className='flex gap-x-3 p-4 justify-between md:hidden'>
                {locales.map(locale => (
                    <li key={locale.locale}>
                        <Link
                            href={"/" + pathName}
                            locale={locale.locale}
                            className={`btn ${locale.locale === currentLocale.locale ? 'bg-slate-900 text-white dark:bg-slate-50 dark:text-black' : ''}`}
                        >
                            {locale.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Desktop view */}
            <div className="hidden md:block">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="btn flex items-center justify-center gap-1.5">
                            {currentLocale.label}
                            <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                                {locales.map((locale) => (
                                    <Menu.Item key={locale.locale}>
                                        {({ active }) => (
                                            <Link
                                                href={"/" + pathName}
                                                locale={locale.locale}
                                                className={`
                                                    ${active ? 'bg-slate-900 text-white dark:bg-slate-50 dark:text-black' : 'text-black dark:text-white'}
                                                    ${locale.locale === currentLocale.locale ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white' : ''}
                                                    group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold transition duration-300 ease-in-out
                                                `}
                                            >
                                                {locale.label}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    );
}
