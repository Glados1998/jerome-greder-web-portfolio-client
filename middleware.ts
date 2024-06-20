import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n.donfig';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for paths that already include a locale
    if (pathname.startsWith('/_next') || pathname.includes('/api') || pathname.includes('/static')) {
        return NextResponse.next();
    }

    const locale = getLocale(request) || i18n.defaultLocale;

    // Redirect to the detected locale
    if (!pathname.startsWith(`/${locale}`)) {
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|static|.*\\..*).*)'],
};
