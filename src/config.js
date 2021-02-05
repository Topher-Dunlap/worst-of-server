module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://topher.dunlap@localhost/worst-of',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}