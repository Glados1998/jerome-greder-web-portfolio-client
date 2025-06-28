import {getRequestConfig} from 'next-intl/server';
    import {routing} from './routing';

    /**
     * This function exports a configuration for handling internationalization (i18n) requests
     * using the `next-intl` library. It dynamically determines the locale based on the request
     * and loads the corresponding translation messages.
     *
     * @async
     * @param {Object} context - The context object provided by `next-intl`.
     * @param {Function} context.requestLocale - A function to retrieve the requested locale.
     * @returns {Promise<Object>} The configuration object containing the locale and translation messages.
     */
    export default getRequestConfig(async ({requestLocale}) => {
        // Retrieve the requested locale asynchronously
        let locale = await requestLocale;

        // If the locale is invalid or not included in the supported locales, use the default locale
        if (!locale || !routing.locales.includes(locale as any)) {
            locale = routing.defaultLocale;
        }

        // Return the configuration object with the resolved locale and its corresponding messages
        return {
            locale,
            messages: (await import(`../../messages/${locale}.json`)).default
        };
    });
