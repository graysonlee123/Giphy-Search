const apiKey = "t9Js0eys1AyskcYxqnMTzaI3ksBDn9hy";
const imageCount = 10;
const buttons = ["Leslie Knope"];

$("#submit").on("click", function (e) {
    //Prevents page from refreshing
    e.preventDefault();

    //Make equal to user's input, and clear the box
    const userInput = $("#input").val();
    $("#input").val("");

    buttons.push(userInput);
    renderButtons();

    // $.ajax({
    //     url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userInput}&limit=${imageCount}`,
    //     method: "GET"
    // }).then(function (data) {
    //     const gifIndex = data.data;
    //     console.log(gifIndex);

    // });

    console.log($("#input").val());
});

function renderButtons () {
    //Empty the buttons div before rending new buttons
    $("#buttonsDiv").empty();

    //Render a button for each item in the array
    buttons.forEach(function(item, i) {
        const btn = $("<button>");
        btn.addClass("summonGifBtn");
        btn.text(item)

        $("#buttonsDiv").append(btn);
    });
}

renderButtons();