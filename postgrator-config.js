require('dotenv').config();
const pg = require('pg'); pg.defaults.ssl = process.env.NODE_ENV === "production";

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    // "ssl": !!process.env.SSL,
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
}