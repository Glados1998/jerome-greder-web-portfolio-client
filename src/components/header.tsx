import Link from "next/link";

const links = [
    {label: "Home", href: "/"},
    {label: "About me", href: "/about"},
    {label: "My projects", href: "/projects"},
    {label: "Contact", href: "/contact"},
];

export default function Header() {
    return (
        <header className="bg-slate-200 p-6 backdrop-blur-md backdrop-opacity-30">
            <nav className="flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold mr-6">
                        JG
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
                <div className="flex items-center">
                    <span className="font-medium mr-4">
                        Languages
                    </span>
                    <select className="bg-slate-200">
                        <option>English</option>
                        <option>Deutsch</option>
                        <option>Français</option>
                    </select>
                </div>
            </nav>
        </header>
    );
}
