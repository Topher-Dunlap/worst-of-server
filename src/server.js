const app = require('./app')
const knex = require('knex')
const { PORT, DATABASE_URL } = require('./config')
const pg = require("pg"); pg.defaults.ssl = true;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: DATABASE_URL,
        // ssl: {
        //     rejectedUnauthorized: false,
        // },
    },
})

app.set('db', db)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})


