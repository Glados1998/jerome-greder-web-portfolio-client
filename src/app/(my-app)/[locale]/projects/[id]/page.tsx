"use client";

import axios from "axios";
import {useLocale, useTranslations} from "next-intl";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {AiFillGithub} from "react-icons/ai";
import {MdWebAsset} from "react-icons/md";
import {Link} from "@/i18n/routing";
import type {Media, Project} from "@/payload-types";
import ProjectRichText from "@/components/ProjectRichText";
import {Skeleton} from "@/components/ui/skeleton";
import SocialBtn from "@/app/(my-app)/[locale]/components/SocialBtn";
import ProgrammingTag from "@/app/(my-app)/[locale]/components/programmingTag";
import ProgrammingTagSkeleton from "@/app/(my-app)/[locale]/components/skeleton/programmingTag-skeleton";
import GitMenu from "@/app/(my-app)/[locale]/components/gitMenu";

type ProjectState =
    | {status: 'loading'}
    | {status: 'success'; project: Project}
    | {status: 'error' | 'not-found'};

function isPopulatedImage(image: number | Media): image is Media & {url: string} {
    return typeof image === 'object' && image !== null && typeof image.url === 'string' && image.url.length > 0;
}

export default function Page() {
    const {id} = useParams<{id: string}>();
    const locale = useLocale();

    // A different project or language starts a fresh request and image selection.
    return <ProjectDetails key={`${locale}/${id}`} id={id} locale={locale}/>;
}

function ProjectDetails({id, locale}: {id: string; locale: string}) {
    const [state, setState] = useState<ProjectState>({status: 'loading'});
    const [attempt, setAttempt] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const t = useTranslations("page.projects");

    useEffect(() => {
        const controller = new AbortController();
        let active = true;

        async function loadProject() {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL || '/api';
            try {
                const response = await axios.get<Project>(
                    `${apiUrl.replace(/\/$/, '')}/project/${encodeURIComponent(id)}`,
                    {
                        params: {depth: 1, draft: false, locale, 'fallback-locale': 'en'},
                        timeout: 15_000,
                        signal: controller.signal,
                    },
                );
                if (!active) return;
                if (!response.data || typeof response.data !== 'object' || response.data.id == null) {
                    setState({status: 'error'});
                    return;
                }
                setState({status: 'success', project: response.data});
            } catch (error) {
                if (!active) return;
                const status = axios.isAxiosError(error) && error.response?.status === 404 ? 'not-found' : 'error';
                setState({status});
            }
        }

        void loadProject();
        return () => {
            active = false;
            controller.abort();
        };
    }, [id, locale, attempt]);

    const project = state.status === 'success' ? state.project : null;
    const images = project?.images?.filter(isPopulatedImage) ?? [];
    const displayImages = images.length > 0
        ? images
        : project?.thumbnail && isPopulatedImage(project.thumbnail) ? [project.thumbnail] : [];
    const selectedImage = displayImages[selectedImageIndex] ?? displayImages[0];
    const gitLinks = project?.git_links ?? [];

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-4">
                <Link className="btn" href="/projects">{t("backBtn")}</Link>
            </div>

            {state.status === 'loading' ? (
                <ProjectSkeleton/>
            ) : project ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="flex min-w-0 flex-col gap-4">
                        <div className="relative h-96 w-full">
                            {selectedImage && (
                                <Image
                                    src={selectedImage.url}
                                    alt={selectedImage.alt}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="rounded-lg object-cover shadow"
                                />
                            )}
                        </div>
                        {displayImages.length > 1 && (
                            <div className="flex flex-wrap gap-3">
                                {displayImages.map((image, index) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        aria-label={image.alt}
                                        aria-pressed={index === selectedImageIndex}
                                        className={`relative h-20 w-20 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <Image src={image.url} alt="" fill sizes="80px" className="rounded object-cover"/>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex min-w-0 flex-col gap-6">
                        <h1 className="text-3xl font-bold">{project.name}</h1>

                        <section aria-labelledby="project-technologies">
                            <h2 id="project-technologies" className="mb-2 text-lg font-semibold">{t("usedTechnologies")} :</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.programming_tags?.map(technology => typeof technology === 'object' && technology !== null && (
                                    <ProgrammingTag key={technology.id} programmingTag={technology}/>
                                ))}
                            </div>
                        </section>

                        <section aria-labelledby="project-description">
                            <h2 id="project-description" className="mb-2 text-lg font-semibold">{t("projectDescription")} :</h2>
                            <ProjectRichText data={project.description} locale={locale}/>
                        </section>

                        {(gitLinks.length > 0 || project.live_link) && (
                            <section aria-labelledby="project-links">
                                <h2 id="project-links" className="mb-2 text-lg font-semibold">{t("cta")} :</h2>
                                <div className="flex flex-wrap gap-4">
                                    {gitLinks.length === 1 && (
                                        <SocialBtn href={gitLinks[0].url} className="btn-github">
                                            <AiFillGithub/> Github
                                        </SocialBtn>
                                    )}
                                    {gitLinks.length > 1 && (
                                        <GitMenu repos={gitLinks}>
                                            <AiFillGithub/> Github
                                        </GitMenu>
                                    )}
                                    {project.live_link && (
                                        <SocialBtn href={project.live_link} className="btn-live">
                                            <MdWebAsset/> Live
                                        </SocialBtn>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            ) : (
                <div role={state.status === 'error' ? 'alert' : 'status'} className="space-y-4">
                    <h1 className="text-2xl font-bold">
                        {state.status === 'not-found' ? t('projectNotFound') : t('fetchProjectError')}
                    </h1>
                    {state.status === 'error' && (
                        <button type="button" className="btn" onClick={() => {
                            setState({status: 'loading'});
                            setAttempt(previous => previous + 1);
                        }}>
                            {t('retry')}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

function ProjectSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2" aria-busy="true">
            <Skeleton className="h-96 w-full"/>
            <div className="flex min-w-0 flex-col gap-6">
                <Skeleton className="h-12 w-80 max-w-full rounded-2xl"/>
                <div>
                    <Skeleton className="mb-2 h-8 w-50"/>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {Array.from({length: 3}, (_, index) => <ProgrammingTagSkeleton key={index}/>)}
                    </div>
                </div>
                <div>
                    <Skeleton className="mb-2 h-8 w-50"/>
                    <Skeleton className="h-70 rounded-lg p-3"/>
                </div>
                <Skeleton className="h-8 w-50"/>
            </div>
        </div>
    );
}
