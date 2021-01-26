const axios = require('axios');
const apiToken = process.env.YELP_API_TOKEN;

////Parameters
//////////response body values
// businesses[x].rating
// businesses[x].image_url
// businesses[x].location.city
// businesses[x].price
// businesses[x].url

const yelpAPICall = (data) => {
    const config = {
        method: 'get',
        url: `https://api.yelp.com/v3/businesses/search?term=${data.term}&location=${data.location}&limit=50&offset=${data.offset}`,
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

module.exports = yelpAPICall