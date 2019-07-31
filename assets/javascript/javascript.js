const apiKey = "t9Js0eys1AyskcYxqnMTzaI3ksBDn9hy";
const imageCount = 10;
const buttons = ["Ron Swanson", "Bob Ross", "Cats"];

// When the user clicks submit on the add buttons form...
$("#submit").on("click", function (e) {
    //Prevents page from refreshing
    e.preventDefault();

    //Make equal to user's input, and clear the box
    const userInput = $("#input").val();
    $("#input").val("");

    buttons.push(userInput);
    renderButtons();
});

// When the user clicks on a button to summon gifs
$("#buttonsDiv").on("click", ".summonGifBtn", function () {
    const searchTerm = $(this).attr("data-name");

    // Search Gihpy API for the search term and generate gifs
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${imageCount}`,
        method: "GET"
    }).then(function (data) {
        const gifsArray = data.data;
        generateGifs(gifsArray);
    });
});

//When the user clicks on the #gifs container, filter for class .gifListener and run function
$("#gifs").on("click", ".gifListener", function () {
    console.log("Clicked on image " + $(this).attr("data-animated-url"));
    // $(this).attr("src", $(this).attr("data-animated-url"));
    $(this).attr("data-state") == "still" ? $(this).attr("src", $(this).attr("data-animated-url")) && $(this).attr("data-state", "play") : $(this).attr("src", $(this).attr("data-still-url")) && $(this).attr("data-state", "still");
});

// Render the buttons by removing old buttons first, then looping for each
function renderButtons() {
    //Empty the buttons div before rending new buttons
    $("#buttonsDiv").empty();

    //Render a button for each item in the array
    buttons.forEach(function (item, i) {
        const btn = $("<button>");
        btn.addClass("summonGifBtn btn btn-light shadow-sm m-1");
        btn.attr("data-name", item);
        btn.text(item)

        $("#buttonsDiv").append(btn);
    });
}

// Generate the gifs divs
function generateGifs(array) {
    console.log("Generating gifs...");
    array.forEach(function (item) {
        const gifTitle = item.title;
        const gifRating = item.rating.toUpperCase();
        const gifAnimationUrl = item.images.fixed_height.url;
        const gifStillUrl = item.images.fixed_height_still.url;

        const divTest = $(`<div class=\"grid-item shadow\">
            <h3>${gifTitle}</h3>
            <p>Rated ${gifRating}</p>
            <img src=\"${gifStillUrl}\" class=\"gifListener w-100 rounded-bottom\" alt="${gifTitle}" data-still-url="${gifStillUrl}" data-animated-url="${gifAnimationUrl}" data-state="still"> 
        </div>`);

        $grid.prepend(divTest).masonry('prepended', divTest);

        $grid.imagesLoaded().progress( function () {
            $grid.masonry('layout');
        });
    })
}

// Run once when the document is ready
$(document).ready(function () {
    renderButtons();
});

//Enable masonry
var $grid = $('.grid').masonry({
    columnWidth: '.grid-item',
    itemSelector: '.grid-item',
});