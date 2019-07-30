console.log("Hello World");
const apiKey = "t9Js0eys1AyskcYxqnMTzaI3ksBDn9hy";

$.ajax({
    url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`,
    method: "GET"
}).then(function (data) {
    console.log(data);
});

$("#submit").on("click", function (e) {
    //Prevents page from refreshing
    e.preventDefault();
    
    console.log($("#input").val());
});