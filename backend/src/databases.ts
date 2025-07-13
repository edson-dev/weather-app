const { Pool } = require('pg');
import env from './config';

const postgres = new Pool({
    connectionString: env.POSTGRES_URL,
});

const cache = require('express-redis-cache')({
    host: env.REDIS_URL, port: env.REDIS_PORT, //auth_pass: REDIS_PASSWORD
});

export { postgres, cache };
