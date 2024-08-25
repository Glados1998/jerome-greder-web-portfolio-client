import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
}

export default withNextIntl(nextConfig);
