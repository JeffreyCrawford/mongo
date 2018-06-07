$.getJSON("/api/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $(".articles").append(
        "<div class='card'>" +
            "<div class='card-header'>" +
                data[i].flytitle +
            "</div>" +
            "<div class='card-body'>" +
                "<h5 class='card-title'>" + data[i].title + "</h5>" +
                "<p class='card-text'>" + data[i].summary + "</p>" +
                "<a href=" + data[i].url + " class='btn btn-dark btn'>" + 'Read More' + "</a>" +
                "<a href=" + '/article/' + data[i]._id + " class='btn btn-secondary btn-note'>" + 'Make a Note' + "</a>" +
            "</div>" +
        "</div>" + 
        "<br>"
      );
    }
  });

$.getJSON("/article/:id", function(data) {
for (var i = 0; i < data.length; i++) {
    $(".article").append(
    "<div class='card'>" +
        "<div class='card-header'>" +
            data[i].flytitle +
        "</div>" +
        "<div class='card-body'>" +
            "<h5 class='card-title'>" + data[i].title + "</h5>" +
            "<p class='card-text'>" + data[i].summary + "</p>" +
            "<a href=" + data[i].url + " class='btn btn-dark btn'>" + 'Read More' + "</a>" +
            "<a href=" + data[i].url + " class='btn btn-secondary btn-note'>" + 'Make a Note' + "</a>" +
            "<a href=" + '/article/' + data[i]._id + " class='btn btn-secondary btn-save'>" + 'Save this Article' + "</a>" +
        "</div>" +
    "</div>" + 
    "<br>"
    );
}
});

$(document).on("click", "btn-note", function() {
    var thisId = $(this).parent().attr("data-id");

    $.ajax({
      method: "GET",
      url: "/article/" + thisId
    })
})