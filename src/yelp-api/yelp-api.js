const express = require('express');
const xss = require('xss');
const axios = require('axios');
// const foldersRouter = express.Router();
const apiToken = process.env.API_TOKEN;

const searchRequest = {
    term:'name of filer Restaurant, bar, etc',
    location: 'san francisco, ca',
    offsetLimit: 900
};

////Parameters


//////////response body values
// businesses[x].rating
// businesses[x].image_url
// businesses[x].location.city
// businesses[x].price
// businesses[x].url

const urlString = `https://api.yelp.com/v3//businesses/search?term=${searchRequest.term}&location=${searchRequest.location}&limit=50&offset=${searchRequest.offsetLimit}`;



const config = {
    method: 'get',
    url: urlString,
    headers: {
        'Authorization': 'Bearer ' + {apiToken},
        'Content-Type': 'application/json'
    },
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });


module.exports = foldersRouter;