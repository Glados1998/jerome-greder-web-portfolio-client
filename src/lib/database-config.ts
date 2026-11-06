const defaultDevelopmentURI =
    'postgres://postgres:root@127.0.0.1:5432/jerome-greder-web-portfolio-cms-db';

type DatabaseEnvironment = Partial<Pick<NodeJS.ProcessEnv,
    'NODE_ENV' | 'DATABASE_URI' | 'DATABASE_URI_DEV' | 'RDS_CA_PEM'>>;

/** Selects the database before Payload initializes or pushes a development schema. */
export function getDatabasePoolConfig(env: DatabaseEnvironment = process.env) {
    const production = env.NODE_ENV === 'production';
    const connectionString = production
        ? env.DATABASE_URI
        : env.DATABASE_URI_DEV || defaultDevelopmentURI;

    if (!connectionString) {
        throw new Error('DATABASE_URI is required in production.');
    }

    let databaseURL: URL;
    try {
        databaseURL = new URL(connectionString);
    } catch {
        throw new Error('The database connection URL is invalid.');
    }
    if (!['postgres:', 'postgresql:'].includes(databaseURL.protocol)) {
        throw new Error('The database connection must use a PostgreSQL URL.');
    }

    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(databaseURL.hostname);
    if (!production && !loopback) {
        throw new Error('DATABASE_URI_DEV must point to localhost for development.');
    }

    return {
        connectionString,
        ssl: production
            ? {
                rejectUnauthorized: true,
                ca: env.RDS_CA_PEM?.replace(/\\+n/g, '\n'),
            }
            : false,
    };
}
