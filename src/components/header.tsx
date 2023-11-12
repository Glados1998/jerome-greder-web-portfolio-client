import Link from "next/link";

const links = [
    { label: "Home", href: "/" },
    { label: "About me", href: "/about" },
    { label: "My projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    return (
        <header className="bg-slate-200 sticky top-0 p-6 backdrop-blur-md bg-white/60 z-10 dark:backdrop-blur-md dark:bg-slate-900/60">
            <nav className="flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold mr-10 ml-10">
                        JG.
                    </h1>
                    <ul className="flex gap-6">
                        {links.map((link) => (
                            <li className="font-medium" key={link.label}>
                                <Link href={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/*<div className={'flex items-center mr-10'}>
                    <span className={'font-medium mr-4'}>
                        Languages
                    </span>
                    <select className={'text-black rounded-md p-1 dark:p-1 dark:rounded-md'}>
                        <option>English</option>
                        <option>Deutsch</option>
                        <option>Français</option>
                    </select>
                </div>*/}
            </nav>
        </header>
    );
}
