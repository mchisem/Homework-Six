//I want the date to display always//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

// Key Variable
 var APIKey = "94fb4992412a398a9fb2333272321439";

//on click function/ local storage of city value
$(".btn").on('click', function(event){
    event.preventDefault();
    console.log("good job!");
    var city = $(".city").val().trim();
    localStorage.setItem('city', city);

    weatherDaily(city);

})  


// function with the URL we need to query the database
function weatherDaily(city){

        // remove previous weather data
        $(".city-name").empty();
        $(".temp").empty();
        $(".humid").empty();
        $(".wind").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=94fb4992412a398a9fb2333272321439"

    // Here we run our AJAX call to the OpenWeatherMap API info
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //creating variables
        var nameCity = response.name;
        //console.log(nameCity);
        var tempCity = response.main.temp;
        // console.log(tempCity);
        var humidCity = response.main.humidity;
        // console.log(humidCity);
        var windCity = response.wind.speed;
        // console.log(windCity);
        $(".city-name").append(nameCity + " ");
        $(".temp").append("Temperature: " + tempCity);
        $(".humid").append("Humidity: " + humidCity);
        $(".wind").append("Wind Speed: " + windCity);

        function init() {
            var cityList = $("<button class='item'></button><br>").text(nameCity); 
            $("#city-list").prepend(cityList);
         }
 
         init();

      })
      
}

