
import {Link} from "@/navigation";

const locales = [
    {label: "en", locale: 'en'},
    {label: "de", locale: 'de'},
    {label: "fr", locale: 'fr'},
]

export default function LocaleSwitcher() {

    return (
        <ul className='flex gap-x-3 p-4 justify-between'>
            {locales.map(locale => {
                return (
                    <li key={locale.locale}>
                        <Link
                            href={"/"}
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
