const axios = require('axios');
const apiToken = process.env.YELP_API_TOKEN;

const yelpService = {

    yelpAPICall(data) {
        const config = {
            method: 'get',
            url: `https://api.yelp.com/v3/businesses/search?term=${data.term}&location=${data.location}&limit=50&offset=${data.offset}`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
    },

    yelpReviewsCall(businessId) {
        ///makes call to yelp for reviews on the three businesses sorted
        const config = {
            method: 'get',
            url: `https://api.yelp.com/v3/businesses/${businessId}/reviews`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios(config)
    },

    retrieveReviews(results) {
        return results.map(business => business.id)
    },

    yelpDataClean(apiRes) { ///if no results reduce offset size based on total results possible return
        if(apiRes.businesses.length === 0) {
            return apiRes.total
        }
        else { ///if there are results return sorted results
            let size = 3
            let sortedData = apiRes.businesses.sort(function(a, b) {
                return (a.rating - b.rating)
            });
            return sortedData.slice(0, size);
        }
    }
}

module.exports = yelpService