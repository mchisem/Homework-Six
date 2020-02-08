//I want to date to display//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

//api url//
var city = "";
var state = "";
var querURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + state + "&appid=fa0bccc8";

$(".btn").on('click', function(){
    console.log("hello");
    var cityValue = $(".city").val();
    localStorage.setItem('city', cityValue);

})


 