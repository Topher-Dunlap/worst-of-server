const express = require('express')

const createAccountRouter = express.Router()
const jsonBodyParser = express.json()

createAccountRouter
    .route('/create')
    .post((req, res) => {
        res.send('ok')
    })

module.exports = createAccountRouter
