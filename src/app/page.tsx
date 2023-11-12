import Image from 'next/image'
import homeBanner from '../assets/images/heroBanner.jpg'
import Link from "next/link";

const links = [
    {label: "About me", href: "/about"},
    {label: "My projects", href: "/projects"},
];

export default function Home() {
    return (
        <>
            <div className="relative">
                <div className="h-[45rem] relative ">
                    <Image src={homeBanner} alt="Home banner" layout="fill" objectFit="cover"/>
                </div>
                <div
                    className="absolute top-40 left-16 w-full h-96 flex flex-col justify-center items-start text-white p-14">
                    <h1 className="text-8xl font-bold">Hello there!</h1>
                    <p className="text-4xl font-medium mt-8">
                        Jérôme Greder <br/>
                        Junior Fullstack Developer <br/>
                        At your service.
                    </p>
                    <hr className="w-32 mt-8"/>
                    <div className="flex flex-row gap-3 mt-8">
                        {links.map((link) => (
                            <Link href={link.href} key={link.label}
                                  className="font-medium hover:bg-slate-50 p-2 rounded-md hover:text-black transition duration-300 ease-in-out">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={'flex flex-col justify-center m-12 text-center'}>
                    <h1 className={'text-3xl font-bold mb-6'}>Crafting digital experiences <br/> out of code with
                        passion. </h1>
                    <p>
                        Building digital experiences is my passion. I love to create beautiful and functional websites and
                        applications. <br/> I am a self-taught junior Fullstack developer and alumni of the <a target={'_blank'} href={'https://www.epitech.eu/en/'} className={'font-medium hover:underline'}>Epitech school</a>.
                    </p>
                    <div className={'mt-6'}>
                        <Link href={'/contact'} className={'font-medium hover:bg-slate-800 p-2 rounded-md hover:text-white transition duration-300 ease-in-out hover:dark:bg-slate-50 hover:dark:text-black'}>
                            Let&apos;s talk!
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}
