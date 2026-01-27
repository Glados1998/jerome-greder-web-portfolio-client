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
import {Services} from "./collections/Services";
import {ProgrammingTag} from "./collections/ProgrammingTag";
import {Project} from "./collections/Project";
import {Values} from "./collections/Values";
import {en} from "@payloadcms/translations/languages/en";
import {de} from "@payloadcms/translations/languages/de";
import {fr} from "@payloadcms/translations/languages/fr";
import {s3Storage} from "@payloadcms/storage-s3";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const ca = process.env.RDS_CA_PEM?.replace(/\\n/g, '\n');

export default buildConfig({
    cors: {
        origins: ["https://jerome-greder.com/", "http://localhost:3000"],
        headers: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods"],
    },
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
            connectionString: process.env.DATABASE_URI || 'postgres://postgres:root@127.0.0.1:5432/jerome-greder-web-portfolio-cms-db',
            ssl: {
                rejectUnauthorized: true,
                ca: ca // CA certificate for SSL connection
            }
        },
    }),
    sharp,
    plugins: [
        payloadCloudPlugin(),
        s3Storage({
            collections: {
                media: true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                },
                region: process.env.S3_REGION,
            },
        }),
    ],
})
