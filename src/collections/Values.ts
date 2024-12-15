import type {CollectionConfig} from 'payload'

export const Values: CollectionConfig = {
    slug: 'values',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
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
            type: "select",
            name: "color",
            label: "Color",
            required: true,
            options: [
                {label: "White", value: "text-white"},
                {label: "Black", value: "text-black"},
            ],
        }
    ],
}
