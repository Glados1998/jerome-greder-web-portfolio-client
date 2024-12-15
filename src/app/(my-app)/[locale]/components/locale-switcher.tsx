import {Link, usePathname} from "@/i18n/routing";


const locales = [
    {label: "en", locale: 'en'},
    {label: "de", locale: 'de'},
    {label: "fr", locale: 'fr'},
]

export default function LocaleSwitcher() {

    const pathName = usePathname()

    return (
        <ul className='flex gap-x-3 p-4 justify-between'>
            {locales.map(locale => {
                return (
                    <li key={locale.locale}>
                        <Link
                            href={"/" + pathName}
                            locale={locale.locale}
                            className='btn'
                        >
                            {locale.label.toUpperCase()}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
