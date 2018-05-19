var gifs = ["Borat", "Leslie Chow", "Will Ferrell"];

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
    var gifDiv = $("<div class='ggif'>");
    
    var p = $("<p>").text("Title: " + info[i].title);
    var d = $("<p>").text("Rating: " + info[i].rating);
    // var download = $("<button>").attr("src", info[i].images.fixed_height.webp); 
    var imageGif = $("<img>");
    imageGif.attr("src", info[i].images.fixed_height.url);
    imageGif.attr("data-still", info[i].images.fixed_height_still.url);
    imageGif.attr("data-animate", info[i].images.fixed_height.url);
    imageGif.attr("data-state", "animate");
    gifDiv.append(p);
    gifDiv.append(d);
    // gifDiv.append(download);
    gifDiv.append(imageGif);
    console.log(gifDiv);
    $(".populator").prepend(gifDiv);
}
});

}


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