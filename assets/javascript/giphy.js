var gifs = ["Borat", "Leslie Chow", "Will Ferrell"];
var index = 0;

function display(){
var gifName = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=10"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);
var info = response.data;
for (var i in info){
    var gifDiv = $(`<div class='ggif'>`);
    
    var p = $("<p>").text("Title: " + info[i].title);
    var d = $("<p>").text("Rating: " + info[i].rating);
    // var dload = $("<a>").text("Click Gif to download");
    
    // dload.attr("download", true);
    // dload.attr("href", info[i].url);
    var fav = $("<button>").text("Favorite Gif");
    fav.addClass("favor");
    fav.attr("data", index);
    console.log(fav);

    var imageGif = $("<img>");
    imageGif.attr("src", info[i].images.fixed_height.url);
    imageGif.attr("data-still", info[i].images.fixed_height_still.url);
    imageGif.attr("data-animate", info[i].images.fixed_height.url);
    imageGif.attr("data-state", "animate");
    gifDiv.append(p);
    gifDiv.append(d);
    // gifDiv.append(dload);
    // gifDiv.append(download);
    gifDiv.append(fav);
    gifDiv.append(imageGif);
    index++;
    $(".populator").append(gifDiv);
    console.log(index);
    


    $(document.body).on("click", ".favor", function(){
        localStorage.clear();
        console.log($(this).attr("value"));
        
        //localStorage.setItem("gif", JSON.stringify(gifDiv[$(this).attr("data")].innerHTML));
        localStorage.setItem("gif", $(".populator")[0].children[$(this).attr("data")].innerHTML);
        
        var retrievedObject = localStorage.getItem('gif');
        // var parsedObject = JSON.parse(retrievedObject);
        $(".favorites").html(retrievedObject);
        
    });
}

});

}

$(".favorites").html(localStorage.getItem("gif"));

  function buttonCreate(){
    $(".buttonHolder").empty();
    for(var i in gifs ){
        var butt = $("<button>");
        butt.addClass("newButtons");
        butt.attr("data-name", gifs[i]);
        butt.text(gifs[i]);
        $(".buttonHolder").append(butt);

    }
  }


  //handles the button click stuff
  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    var textdata = $("#textBar").val().trim();
    gifs.push(textdata);
    buttonCreate();
    $("#textBar").val("");
  });

  $(document).on("click", ".newButtons", display);

  buttonCreate();

  $(document).on("click", "img", function() {

    var state = $(this).attr("data-state");
    console.log(state);

    if (state==='animate'){
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    
  });