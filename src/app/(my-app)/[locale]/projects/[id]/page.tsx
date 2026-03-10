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
import {RichText} from "@payloadcms/richtext-lexical/react"
import {Skeleton} from "@/components/ui/skeleton";
import ProgrammingTagSkeleton from "@/app/(my-app)/[locale]/components/skeleton/programmingTag-skeleton";
import GitMenu from "@/app/(my-app)/[locale]/components/gitMenu";

export default function Page() {
    /**
     * React component logic for fetching and displaying project details based on locale and project ID.
     *
     * This code includes:
     * - State management for project data, locale, loading status, and selected image index.
     * - Effects for determining the locale dynamically and fetching project data from an API.
     * - Logic for determining which images to display based on the project data.
     */

    const {id} = useParams(); // Extracts the project ID from the URL parameters.
    const [singleProject, setSingleProject] = useState(null); // State to store the fetched project data.
    const [locale, setLocale] = useState<string | null>(null); // State to store the current locale.
    const [isLoading, setIsLoading] = useState(true); // State to track whether the data is being loaded.
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the currently selected image index.
    const t = useTranslations("page.projects"); // Hook for translations based on the current locale.

    /**
     * Effect to determine the locale dynamically from the URL.
     * Runs only on the client side (checks for `window` availability).
     */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentLocale = getLocaleFromURL(window.location.href); // Extracts locale from the URL.
            setLocale(currentLocale); // Updates the locale state.
        }
    }, []);

    /**
     * Effect to fetch project data from the API based on the locale and project ID.
     * Runs whenever the `id` or `locale` changes.
     */
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL; // Determines the API URL from environment variables.
        if (apiUrl && locale) {
            setIsLoading(true); // Sets loading state to true before fetching data.
            axios.get(`${apiUrl}/project/${id}?depth=1&draft=false&locale=${locale}&fallback-locale=en`) // Fetches project data.
                .then(response => {
                    setSingleProject(response.data); // Updates the project data state with the response.
                    setIsLoading(false); // Sets loading state to false after data is fetched.
                })
                .catch(error => {
                    console.error('Error fetching project:', error); // Logs any errors during the fetch.
                    setIsLoading(false); // Sets loading state to false in case of an error.
                });
        }
    }, [id, locale]);

    /**
     * Determines the images to display for the project.
     * If the project has images, it uses them; otherwise, it falls back to the thumbnail.
     */
    const displayImages = singleProject?.images?.length > 0
        ? singleProject.images
        : (singleProject?.thumbnail ? [singleProject.thumbnail] : []);

    const gitLinks = Array.isArray(singleProject?.git_links) ? singleProject.git_links : [];
    const hasSingleGitLink = gitLinks.length === 1;
    const hasMultipleGitLinks = gitLinks.length > 1;

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
                                        className="rounded-lg shadow"
                                    />
                                )}
                            </div>
                            {displayImages.length > 1 && (
                                <div className="flex flex-wrap gap-3">
                                    {displayImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`w-20 h-20 relative cursor-pointer ${index === selectedImageIndex ? 'ring-2 rounded ring-blue-500' : ''}`}
                                            onClick={() => setSelectedImageIndex(index)}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt || `Project image ${index + 1}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded hover:ring-2 hover:ring-blue-500 transition duration-200"
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
                                <RichText data={singleProject.description}
                                          className="prose max-w-none max-h-70 overflow-auto bg-slate-200 dark:bg-slate-800 rounded-lg p-3"/>
                            </div>

                                <div>
                                    <span className="text-lg font-semibold mb-2 block">{t("cta")}</span>
                                    <div className="flex gap-4">
                                        {hasSingleGitLink && (
                                            <SocialBtn href={gitLinks[0].url} className="btn-github">
                                                <AiFillGithub/>
                                                Github
                                            </SocialBtn>
                                        )}

                                        {hasMultipleGitLinks && (
                                            <GitMenu repos={gitLinks}>
                                                <AiFillGithub/>
                                                Github
                                            </GitMenu>
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
                <div className="container mx-auto px-4 py-10">
                    <div className="mb-4">
                        <Link className="btn" href="/projects">{t("backBtn")}</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Images */}
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-full h-96 relative"/>
                        </div>

                        {/* Right Column - Project Details */}
                        <div className="flex flex-col gap-6">
                            <Skeleton className="w-80 h-12 rounded-2xl"/>
                            <div>
                                <Skeleton className="w-50 h-8 mb-2"/>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {Array.from({length: 3}).map((_, index) => (
                                        <ProgrammingTagSkeleton key={index}/>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Skeleton className="w-50 h-8 mb-2"/>
                            </div>
                            <div>
                                <Skeleton className="w-50 h-8 mb-2"/>
                                <Skeleton className="max-w-noneh-auto h-70 rounded-lg p-3"/>
                            </div>
                            <div>
                                <Skeleton className="w-50 h-8"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
