import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";

/**
 * Defines the routing configuration for the application.
 *
 * @constant {Object} routing - The routing configuration specifying supported locales
 * and the default locale.
 * @property {string[]} locales - The list of supported locales.
 * @property {string} defaultLocale - The default locale used when no specific locale is provided.
 */
export const routing = defineRouting({
    locales: ['en', 'de', 'fr'],
    defaultLocale: 'fr',
});

/**
 * Creates and exports navigation utilities based on the routing configuration.
 *
 * @constant {Object} Link - A React component for navigation links.
 * @constant {Function} redirect - A function to redirect users to another URL.
 * @constant {Function} usePathname - A hook to retrieve the current pathname.
 * @constant {Function} useRouter - A hook to access router functionalities.
 * @constant {Function} getPathname - A function to get the pathname based on the routing configuration.
 */
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
