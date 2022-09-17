const axios = require('axios');
require('dotenv').config();

// Set up request-specific credentials and 
// keys passed to axios methods as arguments
const request_url_weatherstack = 'http://api.weatherstack.com/current';
const params_weatherstack_request = {
  access_key: process.env.WEATHERSTACK_API_KEY,
  query: '',
  units: 'm',
};

const search_text = 'Los Angeles';
const request_url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json`;
const params_mapbox_request = {
  limit: 1,
  access_token: process.env.MAPBOX_API_KEY,
};

// Send a get-request to geocoding api, send a get-request
// to weatherstack api afterwards, using params object whose
// query property will be populated with the first request's
// response query property respectively
axios.get(request_url_mapbox, {
    params: params_mapbox_request,
  })
  .then(response => {
    const resultArraySize = response.data.features.length;
    if(resultArraySize < 1) {
      console.log('Unable to find specified location');
    } else {
      const responseLongitude = response.data.features[0].center[0]; 
      const responseLatitude = response.data.features[0].center[1]; 
      params_weatherstack_request.query = `${responseLatitude},${responseLongitude}`;
      console.log(`Latitude: ${responseLatitude}` +
      `\nLongitude: ${responseLongitude}`); 

      return axios.get(request_url_weatherstack, {
        params: params_weatherstack_request
      });
    }
  })
  .then(response => {
    if(response.data.error) {
      console.log('Unable to find specified location');
    } else {
      const responseTemperature = response.data.current.temperature;
      const responseApparentTemperature = response.data.current.feelslike;
      const responseWeatherDescription = response.data.current.weather_descriptions[0];
      console.log(`${responseWeatherDescription}. The actual temperature is ` +
      `${responseTemperature}℃ . It feels like it is ` + 
      `${responseApparentTemperature}℃  outside.`);
    }
  })
  .catch(error => {
      console.log('Error', error.message);
      console.log('Check your internet connection');
  });