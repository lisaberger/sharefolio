import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from '../../node_modules/@types/pg/index.js';
import { env } from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

const client = new pg.Client({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
});

async function runMigrations(): Promise<void> {
    await client.connect();

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                name       TEXT PRIMARY KEY,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `);

        const files = readdirSync(MIGRATIONS_DIR)
            .filter((f) => f.endsWith('.sql'))
            .sort();

        for (const file of files) {
            const { rowCount } = await client.query(
                'SELECT 1 FROM schema_migrations WHERE name = $1',
                [file]
            );

            if (rowCount && rowCount > 0) {
                continue;
            }

            const sql = readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');

            console.log(`[migrate] applying ${file}`);

            await client.query('BEGIN');
            try {
                await client.query(sql);
                await client.query(
                    'INSERT INTO schema_migrations (name) VALUES ($1)',
                    [file]
                );
                await client.query('COMMIT');
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            }
        }
    } finally {
        await client.end();
    }
}

export { runMigrations };

if (process.argv[1] && import.meta.url.endsWith(process.argv[1])) {
    runMigrations()
        .then(() => {
            console.log('[migrate] done');
            process.exit(0);
        })
        .catch((error) => {
            console.error('[migrate] failed:', error);
            process.exit(1);
        });
}
