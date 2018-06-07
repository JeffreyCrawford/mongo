
var mongojs = require("mongojs")
var connectionString = "newspaper";
var collections = ["articles"];
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/article")
var Comment = require("../models/comment")
var db = mongojs(connectionString, collections);



module.exports = function(app) {


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

    app.get("/api/articles", function(req, res) {
        db.articles.find({}, function(error, found) {
            if (error) {
                console.log(error)
            }
            else {
                res.json(found)
            }
        })
    })

}
