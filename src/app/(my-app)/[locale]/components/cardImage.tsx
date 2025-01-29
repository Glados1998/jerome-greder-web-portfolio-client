import Image from "next/image";
import minimal from "@/app/(my-app)/[locale]/assets/images/minimal.jpg";


export default function CardImage({cardData}) {
    return (
        <div className="flex ms-4">
            <div className="flex flex-col w-[25rem] lg:w-[45rem]">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-lg overflow-hidden relative w-full h-[15rem] lg:h-[22rem] hover:scale-[1.02] duration-700 ease-in-out">
                    <Image 
                        src={cardData.image ? cardData.image.url : minimal} 
                        alt={cardData.image.alt} 
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={`mt-4 p-4 lg:p-7`}>
                    <h3 className="text-lg lg:text-3xl font-bold pt-2.5 lg:pt-5">{cardData.title}</h3>
                    <p className="text-sm lg:text-lg font-normal lg:font-bold">{cardData.description}</p>
                </div>
            </div>
        </div>
    )
}
