const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: String,
    summary: Text,
    URL: String
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;