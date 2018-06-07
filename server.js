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




var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newspaper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



require("./app/routes/api-routes")(app);
require("./app/routes/html-routes")(app);

//
var PORT = 3000;

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`)
});