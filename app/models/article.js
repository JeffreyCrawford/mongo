var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    flytitle: String,
    title: {
        type: String,
        unique: true
    },
    summary: String,
    url: {
        type: String,
        unique: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    saved: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;