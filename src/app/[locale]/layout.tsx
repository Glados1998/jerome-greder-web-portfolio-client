import type {Metadata} from 'next';
import React from 'react';
import './assets/style/globals.scss';
import {Analytics} from '@vercel/analytics/react';
import {Inter} from 'next/font/google';
import Head from 'next/head';
import {getMessages} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import Header from './components/header';
import Footer from './components/footer';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Jérôme Greder - Web Developer',
    description: 'Jérôme Greder - Web Developer - Portfolio',
};

export default async function RootLayout({
                                             children,
                                             params: {locale}
                                         }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning
              className={'text-black dark:text-white dark:bg-slate-900 flex flex-col min-h-screen'}>
        <NextIntlClientProvider messages={messages}>
            <Head>
                <link rel="icon" href="../../../public/favicon.ico" sizes={"any"}/>
            </Head>
            <body>
            <Header/>
            <main>
                {children}
                <Analytics/>
            </main>
            <Footer/>
            </body>
        </NextIntlClientProvider>
        </html>
    )
}
