// storage-adapter-import-placeholder
import {postgresAdapter} from '@payloadcms/db-postgres'
import {payloadCloudPlugin} from '@payloadcms/payload-cloud'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'
import sharp from 'sharp'

import {Users} from './collections/Users'
import {Media} from './collections/Media'
import {Services} from "@/collections/Services";
import {ProgrammingTag} from "@/collections/ProgrammingTag";
import {Project} from "@/collections/Project";
import {en} from "@payloadcms/translations/languages/en";
import {de} from "@payloadcms/translations/languages/de";
import {fr} from "@payloadcms/translations/languages/fr";
import {Values} from "@/collections/Values";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Services, ProgrammingTag, Project, Values],
    editor: lexicalEditor(),
    i18n: {
        fallbackLanguage: 'en',
        supportedLanguages: {en, de, fr}
    },
    localization: {
        locales: ['en', 'de', 'fr'],
        defaultLocale: 'en',
    },
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
    sharp,
    plugins: [
        payloadCloudPlugin(),
        // storage-adapter-placeholder
    ],
})
