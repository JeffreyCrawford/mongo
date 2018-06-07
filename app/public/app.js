$.getJSON("/api/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".articles").append(
        "<div class='card'>" +
            "<div class='card-header'>" +
                data[i].flytitle +
            "</div>" +
            "<div class='card-body'>" +
                "<h5 class='card-title'>" + data[i].title + "</h5>" +
                "<p class='card-text'>" + data[i].summary + "</p>" +
                "<a href=" + data[i].url + "class=" + 'btn btn-primary' + ">" + "Read More" + "</a>" +
            "</div>" +
        "</div>" + 
        "<br>"
      );
    }
  });