const request = require('postman-request');
require('dotenv').config;

const url = 'http://api.weatherstack.com/current?access_key=83038fccddf50f5d7dcd9fe95212b1e7&query=37.8267,-122.4233';

request({url:url, json: true}, (error, response) => {
    if(error) {
        console.log(`The following error has occured ` +
        `${error}`);
    } else {
        console.log(`It is currently ${response.body.current.temperature} ` +
        `degrees out. But feels like ${response.body.current.feelslike} degrees.`);
    }
});


