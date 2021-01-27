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

    yelpDataClean(apiRes) {
        let size = 3
        let sortedData = apiRes.businesses.sort(function(a, b) {
            return (a.rating - b.rating)
        });
        return sortedData.slice(0, size)},
}

module.exports = yelpService