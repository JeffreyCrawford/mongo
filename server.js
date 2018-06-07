const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const mongoose = require("mongoose");

const db = require("./app/models")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./app/public"));


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
//

request("https://www.economist.com/latest-updates", function(error, response, html) {
    var $ = cheerio.load(html);

    var results = [];

    $(".teaser__group-text").each(function(i, element) {
        
        var flytitle = $(element).children(".flytitle-and-title__body").children(".flytitle-and-title__flytitle").text()
        var title = $(element).children(".flytitle-and-title__body").children(".flytitle-and-title__title").text();
        var summary = $(element).children(".teaser__text").text();
        var url = $(element).parent().attr("href");

        results.push({
            flytitle: flytitle,
            title: title,
            summary: summary,
            url: `https://www.economist.com${url}`
        })
    })

    console.log(results);
});




//
const PORT = 3000;

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`)
});