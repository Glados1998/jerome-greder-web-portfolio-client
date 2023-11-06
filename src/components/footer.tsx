"use client"
import Link from "next/link";

const links = [
    {label: "Home", href: "/"},
    {label: "About me", href: "/about"},
    {label: "My projects", href: "/projects"},
    {label: "Contact", href: "/contact"},
]

const socialLinks = [
    {label: "Github", href: ""},
    {label: "LinkedIn", href: ""},
    {label: "Instagram", href: ""},
]
export default function Footer() {
    return (
        <footer className={'bg-slate-200 p-6 backdrop-blur bg-white/50 sticky inset-x-0 bottom-0'}>
            <div className={'grid grid-flow-col auto-cols-max gap-10 ml-10'}>
                <div className={'grid grid-flow-row gap-3'}>
                    <span className={'font-bold text-md'}>Jérôme Greder web portfolio</span>
                    <span className={'font-medium text-sm'}>© {new Date().getFullYear()} | All rights reserved</span>
                    <span className={'font-medium text-sm'}>Made with <Link href={'https://nextjs.org'}
                                                                            className={'text-blue-500'}>Next.js</Link>, <br/> Powered by <Link
                        href={'https://aws.amazon.com'} className={'text-blue-500'}>AWS</Link></span>
                </div>
                <div className={'grid grid-flow-row gap-3'}>
                    <h1 className={'text-md font-bold'}>
                        Navigation
                    </h1>
                    <ul className={'grid grid-flow-row auto-rows-max'}>
                        {links.map(link => (
                            <li className={'font-medium'} key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={'grid grid-flow-row gap-3'}>
                    <h1 className={'text-md font-bold'}>
                        Social
                    </h1>
                    <ul className={'grid grid-flow-row auto-rows-max'}>
                        {socialLinks.map(link => (
                            <li className={'font-medium'} key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
