const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/d1efe3e24df457cc44d2a858ad4dbec1/" +
    longitude +
    "," +
    latitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the requested location");
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
