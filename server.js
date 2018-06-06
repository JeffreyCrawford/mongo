const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cheerio = require("cheerio");
const request = require("request");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const PORT = 3000;


app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`)
});