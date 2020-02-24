const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
//setup heroku || local port to listen
const port = process.env.PORT || 3000;

//Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

// seting up the server to our website
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Zacchaeus Napuo"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Zacchaeus Napuo"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help is here!",
    message: "Help is always available for you here",
    name: "Zacchaeus Napuo"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      //setting up default value for the destructured object => { longitude, latitude, location } = {}
      if (error) {
        return res.send({
          error
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          address: req.query.address,
          location,
          forecast: forecastData
        });
      });
    }
  );
}); // end of app.get /weather

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

//Setup 404 Page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Zacchaeus Napuo",
    errorMessage: "Help article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Zacchaeus Napuo",
    errorMessage: "My 404 Page"
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
