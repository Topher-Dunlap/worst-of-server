const express = require('express');
const yelpService = require('./yelp-service');
const timeout = require('connect-timeout')
const yelpRouter = express.Router();

yelpRouter
    .route('/search?*')
    .get(  timeout( "6s"),(req, res, next) => {

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
                    const businessId = yelpService.retrieveReviews(cleanedData);

                    ///for each business ID make a GET req for reviews using .map
                    businessId.map((review, idx) =>
                        yelpService.yelpReviewsCall(review)
                            .then(function (response) {

                                ///strip review.text from returned reviews
                                let reviewString = response.data.reviews[0].text;
                                let reviewUrl = response.data.reviews[0].url;
                                let reviewerImg = response.data.reviews[0].user.image_url;

                                ///insert new key values pair into object array being returned to client
                                Object.assign(cleanedData[idx],
                                    {review: reviewString},
                                    {reviewUrl: reviewUrl},
                                    {reviewerImg: reviewerImg}
                                    )

                                ///response going to client
                                return (idx === 2 ? res.json(cleanedData): false);
                            })
                            .catch(function (error) {
                                res.status(400).send({ error: "Something went wrong. Please try again or pick a different region." });
                            })
                    )
                }
                else {
                    ///response going to client
                    res.json(cleanedData);
                }
            })

            .catch(function (error) {
                res.status(400).send({ error: "Something went wrong. Please try again or pick a different region." });
            })
    })

module.exports = yelpRouter