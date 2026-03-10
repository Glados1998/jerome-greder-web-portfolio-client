import type {CollectionConfig} from 'payload'
import {lexicalEditor} from "@payloadcms/richtext-lexical";

export const Project: CollectionConfig = {
    slug: 'project',
    admin: {
        useAsTitle: 'name',
    },
    access: {
      read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'headline',
            label: 'Headline',
            type: 'text',
            required: false,
            localized: true,
            maxLength: 70,
        },
        {
            name: 'images',
            label: 'Images',
            type: 'upload',
            relationTo: 'media',
            maxRows:8,
            hasMany: true,
            required: false,
        },
        {
            name: "thumbnail",
            label: "Thumbnail",
            type: "upload",
            relationTo: "media",
            hasMany: false,
            required: true,
        },
        {
            name: "programming_tags",
            label: "Programming Tags",
            type: "relationship",
            relationTo: "programming-tag",
            hasMany: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'richText',
            editor: lexicalEditor({}),
            localized: true,
            required: true,
        },
        {
            name: "live_link",
            label: "Live Link",
            type: "text",
            required: false,
        },
        {
            name: "github_link",
            label: "Github Link",
            type: "text",
            required: false,
        },
        {
            name: "git_links",
            label: "Git Links",
            type: "array",
            minRows: 1,
            required: false,
            fields: [
                {
                    name: "label",
                    label: "Git label",
                    type: "text",
                    required: true,
                },
                {
                    name: "url",
                    label: "Git URL",
                    type: "text",
                    required: true,
                }
                    ]
        },
        {
            name: "show_project",
            label: "Show Project",
            type: "checkbox",
            defaultValue: false,
        }
    ],
}
