"use client";

import {Link, usePathname} from "@/i18n/routing";
import {Fragment, useEffect, useState} from "react";
import {getLocaleFromURL} from "@/utils/localeUtils";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Import shad/cn dropdown components

/**
 * Array of available locales with their labels and locale codes.
 * Each object contains:
 * - `label`: The display name of the locale.
 * - `locale`: The locale code.
 * @type {{label: string, locale: string}[]}
 */
const locales = [
    {label: "EN", locale: 'en'},
    {label: "DE", locale: 'de'},
    {label: "FR", locale: 'fr'},
];

/**
 * React component for switching between locales.
 *
 * This component includes:
 * - State management for the current locale.
 * - Effect to detect and set the locale based on the URL.
 * - Integration with routing for locale-specific navigation.
 *
 * @returns {JSX.Element} The rendered locale switcher component.
 */
export default function LocaleSwitcher() {
    /**
     * Current pathname of the application, used for routing.
     * @type {string}
     */
    const pathName = usePathname();

    /**
     * State for storing the currently selected locale.
     * Defaults to the first locale in the `locales` array.
     * @type {{label: string, locale: string}}
     */
    const [currentLocale, setCurrentLocale] = useState(locales[0]);

    /**
     * Effect to detect the locale from the URL and update the state.
     * Runs whenever the `pathName` changes.
     */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const detectedLocale = getLocaleFromURL(window.location.href); // Extracts the locale from the URL.
            const matchedLocale = locales.find(loc => loc.locale === detectedLocale) || locales[0]; // Matches the detected locale or defaults to the first locale.
            setCurrentLocale(matchedLocale); // Updates the state with the matched locale.
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="btn flex items-center justify-center gap-1.5">
                            {currentLocale.label}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {locales.map((locale) => (
                            <DropdownMenuItem key={locale.locale} asChild>
                                <Link
                                    href={"/" + pathName}
                                    locale={locale.locale}
                                    className={`${
                                        locale.locale === currentLocale.locale
                                            ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
                                            : ""
                                    }`}
                                >
                                    {locale.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}
