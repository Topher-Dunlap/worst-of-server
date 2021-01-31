require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const yelpRouter = require('./yelp/yelp-router')
const accountRouter = require('./account/account-service')
// const yelpService = require('./routers/yelp-service')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/searchForm', yelpRouter)
app.use('/api/account', accountRouter)

// app.get('/api/search?*', (req, res) => {
//     const apiQueryValues = {
//         term: req.query.term,
//         location: req.query.location,
//         offset: req.query.offset,
//     }
//     yelpService.yelpAPICall(apiQueryValues)
//         .then(function (response) {
//             const yelpResString = (JSON.stringify(response.data));
//             const yelpResParse = (JSON.parse(yelpResString));
//             const cleanedData = yelpService.yelpDataClean(yelpResParse);
//
//             ///add reviews is data returned
//             if (Object.prototype.toString.call(cleanedData) === '[object Array]') {
//
//                 ///get business ID from each returned business to insert into review GET req
//                 const businessReviews = yelpService.retrieveReviews(cleanedData);
//
//                 ///for each business ID make a GET req for reviews using .map
//                 businessReviews.map((review, idx) =>
//                     yelpService.yelpReviewsCall(review)
//                         .then(function (response) {
//
//                             ///strip review.text from returned reviews
//                             let reviewString = JSON.stringify(response.data.reviews[0].text);
//
//                             ///insert new key values pair into object array being returned to client
//                             Object.assign(cleanedData[idx], {review: reviewString})
//                         })
//                         .catch(function (error) {
//                             console.log(error);
//                         })
//                 )
//             }
//             ///response going to client
//             res.json(cleanedData);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
//     // .then(function () {
//     //     console.log("Data before going back to client", cleanedData)
//     //     ///response going to client
//     //     res.json(cleanedData);
//     // });
// })

app.get('/', (req, res) => {
    res.send("Hello, world!")
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        console.error(error)
        response = {message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app