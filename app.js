const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", function (req, res) {
  const apiKey = "513f2c88b75da793b3338315a12844ed";
  const unit = "metric";
  const city = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDiscription = weatherData.weather[0].description;
      res.render("weather-page", {
        temp: temp,
        weatherDiscription: weatherDiscription,
        city: city,
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running at Port 3000");
});
