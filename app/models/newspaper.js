const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewspaperSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    articles: [
        {
            type: Schema.Types.ObjetId,
            ref: "Article"
        }
    ]
});

const Newspaper = mongoose.model("Newspaper", NewspaperSchema);

module.exports = Newspaper;

