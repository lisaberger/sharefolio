import pg from 'pg';

/* Creates the test database and applies the migrations before any test runs. */
const DB_NAME = process.env.TEST_DB_NAME ?? 'sharefolio_test';

export default async function globalSetup(): Promise<void> {
    process.env.DB_NAME = DB_NAME;

    const client = new pg.Client({
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        database: 'postgres',
        user: process.env.DB_USER ?? 'web',
        password: process.env.DB_PASSWORD ?? 'web',
    });

    await client.connect();

    await client.query(`DROP DATABASE IF EXISTS ${DB_NAME} WITH (FORCE)`);
    await client.query(`CREATE DATABASE ${DB_NAME}`);
    await client.end();

    const { runMigrations } = await import('../src/db/migrate.js');
    await runMigrations();
}
