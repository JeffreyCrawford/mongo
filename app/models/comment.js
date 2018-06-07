const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        unique: Date.now
    },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;