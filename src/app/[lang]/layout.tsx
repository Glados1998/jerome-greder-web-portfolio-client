import type { Metadata } from 'next'
import React from "react";
import "src/app/[lang]/assets/style/globals.scss";
import Header from "@/app/[lang]/components/header";
import Footer from "@/app/[lang]/components/footer";
import {i18n, Locale} from "../../../i18.donfig";
import { Analytics } from '@vercel/analytics/react';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Jérôme Greder',
  description: 'Jérôme Greder - Junior Fullstack Developer',

}

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
                                       children,
                                       params
                                   }: {
    children: React.ReactNode
    params: { lang: Locale }
}) {



    return (
        <html lang={inter.className} className={'text-black dark:text-white dark:bg-slate-900 flex flex-col min-h-screen'}>
      <body>
          <Header lang={params.lang}/>
              <main>
                  {children}
                  <Analytics />
              </main>
          <Footer lang={params.lang} />
      </body>
    </html>
  )
}
