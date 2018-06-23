var buttons = [];

function createButtons() {
    
    $("#holder").empty();

    for( i=0; i<buttons.length; i++) {

        var a = $("<button>");

        a.attr("id", "thing");
        a.attr("data-name", buttons[i]);
        a.text(buttons[i]);
        $("#holder").append(a);
    }
};

function displayThing () {

    var unit = $(this).attr("data-name")

    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + unit +"&api_key=7SufAUWSCErlvAp64NoituzCdcVwjAFJ&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET",
    })
    .then(function(response){
        console.log(response);
    })
};



$(".submit").on("click", function(event){

    event.preventDefault();

    var addThing = $(".search").val().trim();
    console.log(addThing);

    buttons.push(addThing);

    createButtons();
});

$(document).on("click", "#thing", displayThing);

createButtons();



