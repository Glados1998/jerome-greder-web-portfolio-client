import type {CollectionConfig} from "payload";

export const ProgrammingTag: CollectionConfig = {
    slug: "programming-tag",
    labels: {
        singular: "Programming Tag",
        plural: "Programming Tags",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
    ],
};
