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

// Daily Weather function with the URL we need to query the database
function weatherDaily(city){

        // remove previous weather data
        $(".city-name").empty();
        $(".temp").empty();
        $(".humid").empty();
        $(".wind").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=94fb4992412a398a9fb2333272321439"

    // AJAX call to the OpenWeatherMap for Daily Weather
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //variables for response array//
        var nameCity = response.name;
        //console.log(nameCity);
            var iconUrl = "http://openweathermap.org/img/wn/";
            var iconCity = response.weather[0].icon; 
            var iconPng = "@2x.png";
            var icon = iconUrl + iconCity + iconPng;
            var iconImg = $("<img>");
            iconImg.attr("src", icon);
            console.log(iconImg);
        var tempCity = response.main.temp;
        //change the temp from celsius to farenheight 
            var fDegree = ((tempCity - 273.15) * 1.8 + 32).toFixed(0);
        // console.log(tempCity);
        var humidCity = response.main.humidity;
        // console.log(humidCity);
        var windCity = response.wind.speed;
        // console.log(windCity);
        $(".city-name").append(nameCity);
        $(".city-name").append(iconImg);
        $(".temp").append("Temperature: " + fDegree + "°F");
        $(".humid").append("Humidity: " + humidCity + "%");
        $(".wind").append("Wind Speed: " + windCity + "MPH");

        //adds city names dynamically, one after the other
        function init() {
            var cityList = $("<button class='item'></button><br>").text(nameCity); 
            $("#city-list").prepend(cityList);

            cityList.on('click', function(){
                console.log("wow");
             })
         }
 
         init();


      })
      
}

