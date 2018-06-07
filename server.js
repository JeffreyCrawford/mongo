var express = require("express");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var mongojs = require("mongojs")
var Article = require("./app/models/article")


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./app/public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var connectionString = "newspaper";
var collections = ["articles"];

var db = mongojs(connectionString, collections);




app.get("/scrape", function(req, res) {

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

        Article.create(results)
        .then(function(dbArticle) {
            db.articles.insert(dbArticle)
            console.log(dbArticle)
        })
        .catch(function(err) {
            return res.json(err);
        })
        
    });
});

app.get("/all", function(req, res) {
    db.articles.find({}, function(error, found) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(found)
        }
    })
})





//
var PORT = 3000;

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`)
});