import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

/**
 * Creates and exports middleware for handling internationalization (i18n) in a Next.js application.
 *
 * The middleware is generated using the `next-intl` library and is configured with routing information
 * to manage locale-based paths.
 */
export default createMiddleware(routing);

/**
 * Configuration object for the middleware.
 *
 * @property {string[]} matcher - Specifies the paths that the middleware should match.
 * The matcher excludes paths related to API routes, Next.js internal files, static assets, and admin routes.
 */
export const config = {
    matcher: ['/((?!api|_next|.*\\..*|admin).*)'],
};
