import type { Metadata } from 'next'
import React from "react";
import {notFound} from 'next/navigation';
import "src/app/[locale]/assets/style/globals.css";
import Header from "@/app/[locale]/components/header";
import Footer from "@/app/[locale]/components/footer";


export const metadata: Metadata = {
  title: 'Jérôme Greder',
  description: 'Jérôme Greder - Junior Fullstack Developer',
}

const locales = ['en', 'de', 'fr'];
export default function RootLayout({children, params: {locale}}) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return (
        <html lang={locale} className={'text-black dark:text-white dark:bg-slate-900 flex flex-col min-h-screen'}>
      <body>
      <Header />
          <main>
              {children}
          </main>
      <Footer />
      </body>
    </html>
  )
}
