import Image from "next/image";

export default function CardImage({cardData, t}) {


    return (
        <div className={"flex ms-4"}>
            <div className={"bg-white rounded-2xl shadow-xl hover:shadow-lg flex flex-col overflow-hidden relative whitespace-normal w-[25rem] h-[15rem] lg:w-[45rem] lg:h-[30rem]  hover:scale-[1.02] duration-700 ease-in-out"}>
                <div>
                    <Image src={cardData.image} alt={cardData.alt} fill={true}/>
                </div>
                <div className={`absolute p-4 lg:p-7 ${cardData.color}`}>
                    <h3 className={"text-lg lg:text-3xl font-bold pt-2.5 lg:pt-5"}>{t(cardData.title)}</h3>
                    <p className={"text-sm lg:text-lg font-normal"}>{t(cardData.description)}</p>
                </div>
            </div>
        </div>
    )
}
