module.exports = function(app) {
    var path = require("path")

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    app.get("/articles", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/articles.html"))
    })

    app.get("/article/comment/:id", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/comment.html"))

    })

}