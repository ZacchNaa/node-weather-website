const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmFhei0yMDIwIiwiYSI6ImNrNnE4OHkyNTB3emMza205NGl2c3djMGsifQ.M3ZGe1Y0RgZIhPB-6f6fWw&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the geocode service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the requested location", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
