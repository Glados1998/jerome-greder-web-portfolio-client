import assert from 'node:assert/strict';
import test from 'node:test';
import {getDatabasePoolConfig} from './database-config';

const localURI = 'postgres://dev:example@localhost:5432/portfolio_dev';
const productionURI = 'postgres://prod:example@database.example.com:5432/portfolio';

test('development and default CLI mode select the local URI despite a production URI being set', () => {
    for (const NODE_ENV of [undefined, 'development', 'test'] as const) {
        const pool = getDatabasePoolConfig({NODE_ENV, DATABASE_URI: productionURI, DATABASE_URI_DEV: localURI});
        assert.equal(pool.connectionString, localURI);
        assert.equal(pool.ssl, false);
    }
});

test('development falls back to localhost when its URI is absent', () => {
    const pool = getDatabasePoolConfig({DATABASE_URI: productionURI});
    assert.equal(new URL(pool.connectionString).hostname, '127.0.0.1');
    assert.equal(pool.ssl, false);
});

test('development rejects a remote database URI', () => {
    assert.throws(() => getDatabasePoolConfig({DATABASE_URI_DEV: productionURI}), /must point to localhost/);
});

test('production selects its own URI and preserves verified TLS with the configured CA', () => {
    for (const RDS_CA_PEM of ['certificate\\nnext-line', 'certificate\\\\nnext-line', 'certificate\nnext-line']) {
        const pool = getDatabasePoolConfig({
            NODE_ENV: 'production',
            DATABASE_URI: productionURI,
            DATABASE_URI_DEV: localURI,
            RDS_CA_PEM,
        });
        assert.equal(pool.connectionString, productionURI);
        assert.deepEqual(pool.ssl, {rejectUnauthorized: true, ca: 'certificate\nnext-line'});
    }
});

test('production requires its URI instead of falling back to development', () => {
    assert.throws(() => getDatabasePoolConfig({NODE_ENV: 'production', DATABASE_URI_DEV: localURI}), /required in production/);
});

test('database URLs must use a PostgreSQL protocol', () => {
    assert.throws(() => getDatabasePoolConfig({DATABASE_URI_DEV: 'https://localhost/database'}), /PostgreSQL URL/);
});

test('malformed connection errors do not expose the connection string', () => {
    assert.throws(
        () => getDatabasePoolConfig({DATABASE_URI_DEV: 'invalid connection with private values'}),
        {message: 'The database connection URL is invalid.'},
    );
});
