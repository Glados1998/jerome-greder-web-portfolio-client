import type {CollectionConfig} from 'payload'

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
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
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
