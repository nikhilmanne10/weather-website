const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlraGlsbWFubmUwMDAiLCJhIjoiY204b3EzeDl2MDJrcTJqc2F6cWxlNzJoNyJ9.xSWi7F6UkSHXf4HYJcaaSw&limit=1`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (!response.body.features || response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { center, place_name } = response.body.features[0];
            if (!center || center.length < 2) {
                callback('Invalid response from Mapbox. Try another location.', undefined);
            } else {
                callback(undefined, {
                    latitude: center[1],
                    longitude: center[0],
                    location: place_name
                });
            }
        }
    });
};

module.exports = geocode;
