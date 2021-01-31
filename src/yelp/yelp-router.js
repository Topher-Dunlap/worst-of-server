const express = require('express');
// const xss = require('xss');
const { requireAuth } = require('../middleware/basic-auth')
const yelpService = require('./yelp-service');

const yelpRouter = express.Router();

yelpRouter
    .route('/search?*')
    .all(requireAuth)
    .get((req, res, next) => {
        const apiQueryValues = {
            term: req.query.term,
            location: req.query.location,
            offset: req.query.offset,
        }
        yelpService.yelpAPICall(apiQueryValues)
            .then(function (response) {
                const yelpResString = (JSON.stringify(response.data));
                const yelpResParse = (JSON.parse(yelpResString));
                const cleanedData = yelpService.yelpDataClean(yelpResParse);

                ///add reviews is data returned
                if (Object.prototype.toString.call(cleanedData) === '[object Array]') {

                    ///get business ID from each returned business to insert into review GET req
                    const businessReviews = yelpService.retrieveReviews(cleanedData);

                    ///for each business ID make a GET req for reviews using .map
                    businessReviews.map((review, idx) =>
                        yelpService.yelpReviewsCall(review)
                            .then(function (response) {

                                ///strip review.text from returned reviews
                                let reviewString = JSON.stringify(response.data.reviews[0].text);

                                ///insert new key values pair into object array being returned to client
                                Object.assign(cleanedData[idx], {review: reviewString})
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    )
                }
                ///response going to client
                res.json(cleanedData);
            })
            .catch(function (error) {
                console.log(error);
            })
        // .then(function () {
        //     console.log("Data before going back to client", cleanedData)
        //     ///response going to client
        //     res.json(cleanedData);
        // });
    })

module.exports = yelpRouter