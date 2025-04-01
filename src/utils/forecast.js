const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=50f97de380e7d7c61aab6949f2f7f5e6&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, 
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}°F out. There is a ${body.current.precip}% chance of rain.`
            );
        }
    });
};

module.exports = forecast;
