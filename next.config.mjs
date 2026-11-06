import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'node:url';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: fileURLToPath(new URL('.', import.meta.url)),
    },
};

export default withPayload(withNextIntl(nextConfig));
