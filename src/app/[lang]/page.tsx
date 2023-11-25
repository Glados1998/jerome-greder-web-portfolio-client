import Image from 'next/image'
import homeBanner from 'src/app/[lang]/assets/images/heroBanner.jpg'
import minimal from 'src/app/[lang]/assets/images/minimal.jpg'
import passion from 'src/app/[lang]/assets/images/passion.jpg'
import Link from "next/link";
import {Locale} from "../../../i18.donfig";
import {getDictionary} from "../../../lib/dictionary";

const links = [
    {label: "about", href: "/about"},
    {label: "projects", href: "/projects"},
];

export default async function Home({params: {lang}}: { params: { lang: Locale } }) {
    const {page} = await getDictionary(lang)
    return (
        <>
            <div className='relative'>
                <Image src={homeBanner} alt="Home banner"
                       className="relative xl:h-[45rem] lg:h-[30rem] md:h-[24rem] sm:h-[20rem]" objectFit='cover'/>
                <div
                    className="absolute top-1 left-4 md:left-16 md:top-14 w-fit flex flex-col justify-center items-start text-white p-4">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-bold">{page.Index.title}</h1>
                    <p className="text-xl md:text-xl lg:text-2xl xl:text-4xl mt-4 md:mt-4 lg:mt-8 xl:mt-8 font-medium">
                        Jérôme Greder <br/>
                        {page.Index.juniorFullStackDeveloper} <br/>
                        {page.Index.atYourService}
                    </p>
                    <hr className="w-20 md:w-32 mt-4 md:mt-4"/>
                    <div className="flex flex-wrap gap-3 mt-2 md:mt-8">
                        {links.map((link) => (
                            <Link href={`/${lang}/${link.href}`} key={link.label}
                                  className="text-sm md:text-base font-medium hover:bg-slate-50 p-2 rounded-md hover:text-black transition duration-300 ease-in-out">
                                {page.Index.buttonsLabel[link.label]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col justify-center m-6 md:m-12 '}>
                <div className={'flex flex-col justify-center items-center '}>
                    <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6 md:w-[30rem] text-center'}>{page.Index.subTitle}</h1>
                    <p className={'text-sm md:text-base w-30 md:w-[50rem] text-center break-words'}>{page.Index.subDescription}<a
                        target={'_blank'} href={'https://www.epitech.eu/'}
                        className={'font-medium hover:underline'}>{page.Index.epitech}</a>.
                    </p>
                </div>
            </div>
            <div className={'flex flex-col md:flex-row gap-12 justify-evenly m-6 md:m-12 text-center'}>
                <div className={'flex flex-col gap-12'}>
                    <div>
                        <Image src={passion} alt="Passion" objectFit='cover' width={500} height={250}
                               className="rounded-2xl shadow-lg"/>
                    </div>
                    <div className={'text-left w-fit md:w-[400px] break-words'}>
                        <h1 className={'text-xl md:text-3xl font-bold mb-3'}>{page.Index.coding.title}</h1>
                        <p className={'text-sm md:text-base font-medium'}>{page.Index.coding.description}</p>
                    </div>
                </div>
                <div className={'flex flex-col gap-12'}>
                    <div>
                        <Image src={minimal} alt="Passion" objectFit='cover' width={450} height={200}
                               className="rounded-2xl shadow-lg"/>
                    </div>
                    <div className={'text-left w-fit md:w-[400px] break-words'}>
                        <h1 className={'text-xl md:text-3xl font-bold mb-3'}>{page.Index.minimalism.title}</h1>
                        <p className={'text-sm md:text-base font-medium'}>{page.Index.minimalism.description}</p>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col justify-center m-6 md:m-12 '}>
                <div className={'flex flex-col justify-center items-center '}>
                    <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6 md:w-[30rem] text-center'}>{page.Index.contact.title}</h1>
                    <p className={'text-sm md:text-base w-30 md:w-[50rem] text-center'}>{page.Index.contact.description}</p>
                </div>
                <div className={'mt-4 md:mt-6 flex justify-center'}>
                    <Link href={`/${lang}/contact`}
                          className={'text-sm md:text-base font-medium hover:bg-slate-800 p-2 rounded-md hover:text-white transition duration-300 ease-in-out hover:dark:bg-slate-50 hover:dark:text-black'}>
                        {page.Index.contact.cta}
                    </Link>
                </div>
            </div>
        </>
    )
}
