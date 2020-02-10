//I want to date to display//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

// Key Variable
// var APIKey = "94fb4992412a398a9fb2333272321439";

//on click function/ local storage of city value
$(".btn").on('click', function(){
    console.log("good job!");
    var cityValue = $(".city").val().trim();
    localStorage.setItem('city', cityValue);

    weatherDaily(cityValue);

})

// function with the URL we need to query the database
function weatherDaily(cityValue){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityValue+"&appid=94fb4992412a398a9fb2333272321439"

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
      })
}
