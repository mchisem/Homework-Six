//I want to date to display//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

// Key Variable
// var APIKey = "94fb4992412a398a9fb2333272321439";

// function with the URL we need to query the database
function weatherDaily(cityValue) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityValue+"&appid=aa5b71088d417c59bb0ed00cd6cfe06e"

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
      })
}


$(".btn").on('click', function(){
    console.log("hello");
    var cityValue = $(".city").val().trim();
    localStorage.setItem('city', cityValue);

    var cityButton = $("<div>");
    $(".city").append(cityButton);

    // $(".city").val(localStorage.getItem('city')); 

    weatherDaily(cityValue);
})



 