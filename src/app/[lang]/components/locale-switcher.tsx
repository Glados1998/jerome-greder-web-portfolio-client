
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {i18n} from "../../../../i18.donfig";

export default function LocaleSwitcher() {
    const pathName = usePathname()

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    return (
        <ul className='flex gap-x-3 p-4 justify-between'>
            {i18n.locales.map(locale => {
                return (
                    <li key={locale}>
                        <Link
                            href={redirectedPathName(locale)}
                            className='text-sm md:text-base font-medium hover:bg-slate-800 p-2 rounded-md hover:text-white transition duration-300 ease-in-out hover:dark:bg-slate-50 hover:dark:text-black'
                        >
                            {locale.toUpperCase()}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
