"use client";
import axios from "axios";
import {useTranslations} from "use-intl";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getLocaleFromURL} from "@/utils/localeUtils";
import Link from "next/link";
import ProgrammingTag from "@/app/(my-app)/[locale]/components/programmingTag";
import Image from "next/image";
import {AiFillGithub} from "react-icons/ai";
import {MdWebAsset} from "react-icons/md";

export default function Page() {
    const {id} = useParams();
    const [singleProject, setSingleProject] = useState(null);
    const [locale, setLocale] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const t = useTranslations("page.projects");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentLocale = getLocaleFromURL(window.location.href);
            setLocale(currentLocale);
        }
    }, []);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL;
        if (apiUrl && locale) {
            setIsLoading(true);
            axios.get(`${apiUrl}/project/${id}?depth=1&draft=false&locale=${locale}`).then(response => {
                setSingleProject(response.data);
                setIsLoading(false);
            }).catch(error => {
                console.error('Error fetching project:', error);
                setIsLoading(false);
            });
        }
    }, [id, locale]);

    const displayImages = singleProject?.images?.length > 0 ? singleProject.images : (singleProject?.thumbnail ? [singleProject.thumbnail] : []);

    return (
        <>
            {!isLoading ? (
                <div className="container mx-auto px-4 py-10">
                    <div className="mb-4">
                        <Link className="btn" href="/projects">{t("backBtn")}</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Images */}
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-96 relative">
                                {displayImages.length > 0 && (
                                    <Image
                                        src={displayImages[selectedImageIndex].url}
                                        alt={displayImages[selectedImageIndex].alt || "Project image"}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                )}
                            </div>
                            {displayImages.length > 1 && (
                                <div className="flex flex-wrap gap-3">
                                    {displayImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`w-20 h-20 relative cursor-pointer ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                                            onClick={() => setSelectedImageIndex(index)}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt || `Project image ${index + 1}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Project Details */}
                        <div className="flex flex-col gap-6">
                            <h1 className="text-3xl font-bold">{singleProject?.name}</h1>

                            <div>
                                <span className="text-lg font-semibold mb-2 block">{t("usedTechnologies")}</span>
                                <div className="flex flex-wrap gap-2">
                                    {singleProject?.programming_tags?.map((technology, index) => (
                                        <ProgrammingTag key={index} programmingTag={technology}/>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-lg font-semibold mb-2 block">{t("projectDescription")}</span>
                                <div className="prose max-w-none max-h-60 overflow-auto">
                                    <p>{singleProject?.description}</p>
                                </div>
                            </div>

                            <div>
                                <span className="text-lg font-semibold mb-2 block">{t("cta")}</span>
                                <div className="flex gap-4">
                                    {singleProject?.github_link && (
                                        <SocialBtn href={singleProject.github_link} className="btn-github">
                                            <AiFillGithub/>
                                            Github
                                        </SocialBtn>
                                    )}
                                    {singleProject?.live_link && (
                                        <SocialBtn href={singleProject.live_link} className="btn-live">
                                            <MdWebAsset/>
                                            Live
                                        </SocialBtn>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
