import Image from 'next/image'
import homeBanner from 'src/app/[locale]/assets/images/heroBanner.jpg'
import Link from "next/link";
import {useTranslations} from 'next-intl';

const links = [
    {label: "about-me", href: "/about"},
    {label: "my-projects", href: "/projects"},
];

export default function Home() {
    const t = useTranslations('Index');
    return (
        <>
            <div className='relative'>
                <Image src={homeBanner} alt="Home banner"
                       className="relative xl:h-[45rem] lg:h-[30rem] md:h-[24rem] sm:h-[20rem]" objectFit='cover'/>
                <div
                    className="absolute top-1 left-4 md:left-16 md:top-14 w-fit flex flex-col justify-center items-start text-white p-4">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-bold">{t('title')}</h1>
                    <p className="text-xl md:text-xl lg:text-2xl xl:text-4xl mt-4 md:mt-4 lg:mt-8 xl:mt-8 font-medium">
                        Jérôme Greder <br/>
                        {t('junior-full-stack-developer')} <br/>
                        {t('at-your-service')}
                    </p>
                    <hr className="w-20 md:w-32 mt-4 md:mt-4"/>
                    <div className="flex flex-wrap gap-3 mt-2 md:mt-8">
                        {links.map((link) => (
                            <Link href={link.href} key={link.label}
                                  className="text-sm md:text-base font-medium hover:bg-slate-50 p-2 rounded-md hover:text-black transition duration-300 ease-in-out">
                                {t(link.label)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col justify-center m-6 md:m-12 text-center'}>
                <h1 className={'text-xl md:text-3xl font-bold mb-4 md:mb-6'}>Crafting digital experiences <br/> out
                    of code with
                    passion. </h1>
                <p className={'text-sm md:text-base'}>
                    Building digital experiences is my passion. I love to create beautiful and functional websites
                    and
                    applications. <br/> I am a self-taught junior Fullstack developer and alumni of the <a
                    target={'_blank'} href={'https://www.epitech.eu/en/'} className={'font-medium hover:underline'}>Epitech
                    school</a>.
                </p>
                <div className={'mt-4 md:mt-6'}>
                    <Link href={'/contact'}
                          className={'text-sm md:text-base font-medium hover:bg-slate-800 p-2 rounded-md hover:text-white transition duration-300 ease-in-out hover:dark:bg-slate-50 hover:dark:text-black'}>
                        Let&apos;s talk!
                    </Link>
                </div>
            </div>
        </>
    )
}
