import React from 'react';
import {LinkJSXConverter, RichText, type JSXConvertersFunction} from '@payloadcms/richtext-lexical/react';
import type {Project} from '../payload-types';

type DocumentReference = {relationTo: string; value: unknown};

function projectHref(reference: DocumentReference | undefined | null, locale: string) {
    if (reference?.relationTo !== 'project') return undefined;

    const value = reference.value;
    const id = typeof value === 'object' && value !== null ? ('id' in value ? value.id : undefined) : value;
    if ((typeof id !== 'number' && typeof id !== 'string') || String(id).trim() === '') return undefined;

    return `/${locale}/projects/${encodeURIComponent(String(id))}`;
}

export default function ProjectRichText({data, locale}: {data: Project['description']; locale: string}) {
    const linkConverters = LinkJSXConverter({
        internalDocToHref: ({linkNode}) => projectHref(linkNode.fields.doc, locale) ?? '',
    });

    const converters: JSXConvertersFunction = ({defaultConverters}) => ({
        ...defaultConverters,
        ...linkConverters,
        link: (args) => {
            // Preserve the text of deleted or unsupported document links without a dead anchor.
            if (args.node.fields.linkType === 'internal' && !projectHref(args.node.fields.doc, locale)) {
                return <>{args.nodesToJSX({nodes: args.node.children})}</>;
            }
            const converter = linkConverters.link;
            return typeof converter === 'function' ? converter(args) : converter;
        },
        // Keep existing relationship nodes readable and project references navigable.
        relationship: ({node}) => {
            const value = node.value;
            if (value == null) return null;

            const document = typeof value === 'object' ? value : undefined;
            const label = document && (
                'name' in document ? document.name :
                'title' in document ? document.title :
                'label' in document ? document.label :
                'filename' in document ? document.filename : undefined
            );
            const id = document?.id ?? value;
            const text = typeof label === 'string' ? label : `#${id}`;
            const href = projectHref(node, locale);

            return <p>{href ? <a href={href}>{text}</a> : text}</p>;
        },
    });

    return (
        <RichText
            data={data}
            converters={converters}
            className="prose prose-slate dark:prose-invert prose-li:marker:text-slate-600 dark:prose-li:marker:text-slate-400 prose-blockquote:border-slate-400 dark:prose-blockquote:border-slate-500 max-w-none break-words rounded-lg bg-slate-200 p-3 dark:bg-slate-800"
        />
    );
}
