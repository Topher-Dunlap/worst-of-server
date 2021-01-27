require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const yelpService = require('./yelp-api/yelp-service')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

// app.use(function validateBearerToken(req, res, next) {
//     const apiToken = process.env.API_TOKEN
//     const authToken = req.get('Authorization')
//
//     if (!authToken || authToken.split(' ')[1] !== apiToken) {
//         return res.status(401).json({error: 'Unauthorized request'})
//     }
//     next()
// })

app.get('/api/search?*', (req, res) => {
    const apiQueryValues = {
        term: req.query.term,
        location: req.query.location,
        offset: req.query.offset,
    }
    console.dir(apiQueryValues)
    yelpService.yelpAPICall(apiQueryValues)
        .then(function (response) {
            const yelpRes = (JSON.stringify(response.data));
            const yelpResParse = (JSON.parse(yelpRes));
            // console.dir(yelpResParse)
            // console.dir(yelpService.yelpDataClean(yelpResParse))
            // res.send("pre res.send")
            res.send(yelpService.yelpDataClean(yelpResParse));
        })
        .catch(function (error) {
            console.log(error);
        });
})

app.get('/', (req, res) => {
    res.send("Hello, world!")
})

 app.use(function errorHandler(error, req, res, next) {
     let response
     if (NODE_ENV === 'production') {
         response = { error: { message: 'server error' } }
     } else {
         console.error(error)
         response = { message: error.message, error }
     }
     res.status(500).json(response)
 })

module.exports = app