//I want to date to display//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

//api url//
var querURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityname + state + "&appid=fa0bccc8";

$(".btn").on('click', function(){
    //console.log("hello");
    var city = $(".city").val();
    localStorage.setItem('city', city);

    var savedCity = $("<button>").text(city);

    $(".city").append(savedCity);
})


