const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: String,
    comment: Text,
    date: date.now
});

const Comment = mongoose.model("Comment", ArticleSchema);

module.exports = Comment;