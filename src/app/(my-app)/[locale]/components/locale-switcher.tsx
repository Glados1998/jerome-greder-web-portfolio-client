"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const locales = [
    { label: "en", locale: 'en' },
    { label: "de", locale: 'de' },
    { label: "fr", locale: 'fr' },
];

export default function LocaleSwitcher() {
    const pathName = usePathname();
    const currentLocale = locales.find(loc => pathName.startsWith(`/${loc.locale}`)) || locales[0];

    return (
        <>
            {/* Mobile view */}
            <ul className='flex gap-x-3 p-4 justify-between md:hidden'>
                {locales.map(locale => (
                    <li key={locale.locale}>
                        <Link
                            href={"/" + pathName}
                            locale={locale.locale}
                            className='btn'
                        >
                            {locale.label.toUpperCase()}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Desktop view */}
            <div className="hidden md:block">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            {currentLocale.label.toUpperCase()}
                            <ChevronDownIcon
                                className="-mr-1 ml-2 h-5 w-5"
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
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1">
                                {locales.map((locale) => (
                                    <Menu.Item key={locale.locale}>
                                        {({ active }) => (
                                            <Link
                                                href={"/" + pathName}
                                                locale={locale.locale}
                                                className={`${
                                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {locale.label.toUpperCase()}
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
