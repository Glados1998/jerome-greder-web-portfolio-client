import type {CollectionConfig} from 'payload'

export const Project: CollectionConfig = {
    slug: 'project',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: "lorem upsum",
            label: "Programming Tags",
            type: "relationship",
            relationTo: "programming-tag",
            hasMany: true,
            required: true,
        },
        {
            name: "live-link",
            label: "Live Link",
            type: "text",
            required: false,
        },
        {
            name: "github-link",
            label: "Github Link",
            type: "text",
            required: false,
        },
    ],
}
