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
    ],
}
