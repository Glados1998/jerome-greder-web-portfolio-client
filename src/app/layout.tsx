import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../assets/style/globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jérôme Greder',
  description: 'Jérôme Greder - Junior Fullstack Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={'text-black dark:text-white dark:bg-slate-900 flex flex-col min-h-screen'}>
      <body className={inter.className}>
      <Header />
          <main>
              {children}
          </main>
      <Footer />
      </body>
    </html>
  )
}
