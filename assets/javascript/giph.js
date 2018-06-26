var buttons = [];


function createButtons() {

    $("#holder").empty();

    for (i = 0; i < buttons.length; i++) {

        var a = $("<button>");

        a.attr("id", "thing");
        a.attr("data-name", buttons[i]);
        a.text(buttons[i]);
        $("#holder").append(a);
    }
};

function displayThing() {

    var unit = $(this).attr("data-name")

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + unit + "&api_key=7SufAUWSCErlvAp64NoituzCdcVwjAFJ&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET",
    })
        .then(function (response) {
            console.log(response);

            for (i = 0; i < response.data.length; i++) {

                var div = $("<div>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating)
                var img = $("<img>");
                img.attr("src", response.data[i].images.fixed_height_still.url);
                img.attr("data-state", "still");
                img.attr("data-still", response.data[i].images.fixed_height_still.url);
                img.attr("data-animate", response.data[i].images.fixed_height.url);
                div.append(p);
                div.append(img);
                img.addClass("gif")

                $("#img-display").prepend(div);
            }
        })
};

function god() {
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
};
$(".submit").on("click", function (event) {

    event.preventDefault();

    var addThing = $(".search").val().trim();
    console.log(addThing);

    buttons.push(addThing);

    createButtons();
});


$(document).on("click", "#thing", displayThing);
$(document).on("click", ".gif", god);

createButtons();



