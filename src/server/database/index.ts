import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { DB } from './types';

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        max: process.env.DATABASE_CONNECTIONS ? parseInt(process.env.DATABASE_CONNECTIONS, 10) : 10,
    }),
});

export const db = new Kysely<DB>({
    dialect,
});
