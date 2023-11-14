"use client"

const links = [
    {label: "Home", href: "/"},
    {label: "About me", href: "/about"},
    {label: "My projects", href: "/projects"},
    {label: "Contact", href: "/contact"},
]

const socialLinks = [
    {label: "Github", href: "https://github.com/Glados1998"},
    {label: "LinkedIn", href: "https://www.linkedin.com/in/jerome-greder/"},
]
export default function Footer() {
    return (
        <footer className={'bg-slate-200 p-6 backdrop-blur bg-white/50 md:sticky inset-x-0 bottom-0 z-10 dark:backdrop-blur-md dark:bg-slate-900/60'}>
            <div className={'grid grid-rows-2 gap-4 md:grid-rows-1 md:grid-flow-col auto-cols-max md:gap-10 ml-4 md:ml-10'}>

                {/* First Row - Main Content */}
                <div className={'grid grid-flow-row gap-3'}>
                    <span className={'font-bold text-md'}>Jérôme Greder web portfolio</span>
                    <span className={'font-medium text-sm'}>© {new Date().getFullYear()} | All rights reserved</span>
                    <span className={'font-medium text-sm'}>Made with <a target={'_blank'} href={'https://nextjs.org'} className={'text-blue-500'}>Next.js</a>, <br/> Powered by <a target={'_blank'} href={'https://vercel.com/'} className={'text-blue-500'}>Vercel</a></span>
                </div>

                {/* Second Row - Navigation and Social Links */}
                <div className={'grid grid-cols-2 gap-3 '}>
                    {/* Navigation Links */}
                    <div>
                        <h1 className={'text-md font-bold'}>
                            Navigation
                        </h1>
                        <ul className={'grid grid-flow-row auto-rows-max'}>
                            {links.map(link => (
                                <li className={'font-medium'} key={link.label}>
                                    <a target={'_blank'} href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h1 className={'text-md font-bold'}>
                            Social
                        </h1>
                        <ul className={'grid grid-flow-row auto-rows-max'}>
                            {socialLinks.map(link => (
                                <li className={'font-medium'} key={link.label}>
                                    <a target={'_blank'} href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
