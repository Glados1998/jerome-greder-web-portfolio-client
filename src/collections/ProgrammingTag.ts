import type {CollectionConfig} from "payload";

export const ProgrammingTag: CollectionConfig = {
    slug: "programming-tag",
    admin: {
        useAsTitle: "label",
    },
    labels: {
        singular: "Programming Tag",
        plural: "Programming Tags",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "label",
            type: "text",
            required: true,
        },
    ],
};
