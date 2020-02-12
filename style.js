//I want the date to display always//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

// Key Variable
 var APIKey = "94fb4992412a398a9fb2333272321439";

//on click function/ local storage of city value
$(".btn").on('click', function(event){
    event.preventDefault();
    console.log("good job!");
    var city = $(".city").val().trim();
    // localStorage.setItem('city', city);

    weatherDaily(city);
    fiveDay(city);
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
        //variables for daily weather response array//
        var nameCity = response.name;
        //console.log(nameCity);
            var iconUrl = "http://openweathermap.org/img/wn/";
            var iconCity = response.weather[0].icon; 
            var iconPng = "@2x.png";
            var icon = iconUrl + iconCity + iconPng;
            var iconImg = $("<img>");
            iconImg.attr("src", icon);
            // console.log(iconImg);
        var tempCity = response.main.temp;
        //change the temp from celsius to farenheight 
            var fDegree = ((tempCity - 273.15) * 1.8 + 32).toFixed(0);
        // console.log(tempCity);
        var humidCity = response.main.humidity;
        // console.log(humidCity);
        var windCity = response.wind.speed;
        // console.log(windCity);
        var lonCity = response.coord.lon;
        //console.log(lonCity);
        var latCity = response.coord.lat;
        //console.log(latCity);
        var index = (lonCity, latCity);
        //console.log(index);
        $(".city-name").append(nameCity);
        $(".city-name").append(iconImg);
        $(".temp").append("Temperature: " + fDegree + "°F");
        $(".humid").append("Humidity: " + humidCity + "%");
        $(".wind").append("Wind Speed: " + windCity + "MPH");

        //adds city names dynamically, one after the other
        function init() {
            var cityList = $("<button class='item'></button><br>").text(nameCity); 

            $("#city-list").prepend(cityList);

            localStorage.setItem('city-list', nameCity);
    
            cityList.on('click', function(){
                console.log("wow");
             })
         }
         init();

         
      })

    }

// //uv index function
// function uvIndex(latCity, lonCity) {
//     //http://api.openweathermap.org/data/2.5/uvi?appid=94fb4992412a398a9fb2333272321439&lat="37.75"&lon="-122.37"
//     var IndexUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=94fb4992412a398a9fb2333272321439&lat="+latCity+"&lon="+lonCity;
   
//     console.log(IndexUrl);

//     $.ajax({
//         url: IndexUrl,
//         method: "GET"
//     }).then(function(response){
//         var uvValue = response.value;
//         console.log(uvValue);
//     })
   
// }


//five day forecast funciton
function fiveDay(city){

    //clear out previous five day data//
        $("#day-one").empty();
        $("#day-two").empty();
        $("#day-three").empty();
        $("#day-four").empty();
        $("#day-five").empty();
        $("#five-title").empty();
        //$(".line").empty();

    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
    //http://api.openweathermap.org/data/2.5/forecast?q=long+beach&appid=94fb4992412a398a9fb2333272321439
    var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=94fb4992412a398a9fb2333272321439";

    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function(dataResponse){
        var title = $("<h2 id='five-title'>Five-day Forecast:</h2>");
        // console.log(title);
        $("#five-day").prepend(title);

       // var line = $("<hr class='line'>");
        //$("#five-day").prepend(line);

        //date variables//
        var dayOne = moment.unix(dataResponse.list[1].dt).utc().format("LL");
        $("#day-one").append(dayOne);
        //console.log(dayOne);
        var dayTwo = moment.unix(dataResponse.list[9].dt).utc().format("LL");
        $("#day-two").append(dayTwo);
        //console.log(dayTwo);
        var dayThree = moment.unix(dataResponse.list[17].dt).utc().format("LL");
        $("#day-three").append(dayThree);
        //console.log(dayThree);
        var dayFour = moment.unix(dataResponse.list[25].dt).utc().format("LL");
        $("#day-four").append(dayFour);
        //console.log(dayFour);
        var dayFive = moment.unix(dataResponse.list[33].dt).utc().format("LL");
        $("#day-five").append(dayFive);

        //icon variables//
        var fiveIcon = "http://openweathermap.org/img/wn/";
        var cityIcon = dataResponse.list[1].weather[0].icon; 
        var iconAt = "@2x.png";

        var icon = fiveIcon + cityIcon + iconAt;
        var img = $("<img>");
        img.attr("src", icon);

        //temp variables//
        //var temp = dataResponse.list[1].main.temp;
        //change the temp from celsius to farenheight 
            //var f = ((temp - 273.15) * 1.8 + 32).toFixed(0);
            //$("#temp-one").append("Temp: " + f + "°F");
      
            $("#temp-one").prepend("Hello!");
    })

}