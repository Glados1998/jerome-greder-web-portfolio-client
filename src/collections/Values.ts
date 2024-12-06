import type {CollectionConfig} from 'payload'

export const Values: CollectionConfig = {
    slug: 'values',
    admin: {
        useAsTitle: 'title',
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
    ],
}
