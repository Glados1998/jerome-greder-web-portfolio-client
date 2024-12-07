import type {CollectionConfig} from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
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
            name: 'color',
            label: 'Color',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: 'text-white'
        }
    ],
}
