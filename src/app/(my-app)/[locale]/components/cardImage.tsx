import Image from "next/image";
import minimal from "@/app/(my-app)/[locale]/assets/images/minimal.jpg";

export default function CardImage({cardData}) {
    return (
        <div className="p-2">
            <div className="group relative w-100 h-80 rounded-2xl shadow overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]">
                <Image
                    src={cardData.image ? cardData.image.url : minimal}
                    alt={cardData.image?.alt || cardData.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-start p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-[4px]">
                        {cardData.title}
                    </h3>
                    <p className="text-sm font-normal transition-all duration-300 group-hover:translate-y-[4px] max-h-32 overflow-hidden">
                        {cardData.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
