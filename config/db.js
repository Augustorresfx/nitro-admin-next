import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
});

export {pool};