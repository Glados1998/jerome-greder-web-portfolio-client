import type {CollectionConfig} from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'name',
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
    ],
}
