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
        

        //border//
        var border = $("#weather-day");
        $("#weather-day").append(border).css({"border-bottom":"1px solid white"});

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=94fb4992412a398a9fb2333272321439"

    // AJAX call to the OpenWeatherMap for Daily Weather
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //variables for daily weather response array//
        var nameCity = response.name;
        //console.log(nameCity);
        var date = response.dt;
        //console.log(date);
        var dayDate = moment.unix(date).format("L");
        //console.log(dayDate);
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
        $(".city-name").append(nameCity + " ");
        $(".city-name").append(" " + "(" + dayDate + ")"); 
        $(".city-name").append(iconImg);
        $(".temp").append("Temperature: " + fDegree + "°F");
        $(".humid").append("Humidity: " + humidCity + "%");
        $(".wind").append("Wind Speed: " + windCity + "MPH").css({"margin-bottom":"30px"});

        //adds city names dynamically, one after the other
        function init() {
            var cityList = $("<button class='item'></button><br>").css({"border":"none","padding":"10px"}).text(nameCity); 

            // var button = $(".item");
            // $(".item").append(button).css({"color":"white"});

            var btnBorder = $("#city-list");
            $("#city-list").append(btnBorder).css({"background-color":"#F0F0F0"});

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
        // $(dayOne).empty();
        // $("#day-three").empty();
        // $("#day-four").empty();
        // $("#day-five").empty();
        // $("#five-title").empty();
        //$(".line").empty();
        $(".five-title").empty();

        //background color for days//
        var background = $(".day");
        $(".day").append(background).css({"background-color":"darkblue", "padding":"15px"});

    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
    //http://api.openweathermap.org/data/2.5/forecast?q=long+beach&appid=94fb4992412a398a9fb2333272321439
    var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=94fb4992412a398a9fb2333272321439";

    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function(dataResponse){
        var title = $("<h2 class='five-title'>Five-day Forecast:</h2>");
        // console.log(title);
        $("#five-day").prepend(title);

        // var line = $("<hr class='line'>");
        // $("#five-day").prepend(line);

        //date variables//
        var dayOne = moment.unix(dataResponse.list[1].dt).utc().format("L");
        $("#day-one").prepend(dayOne);
        //console.log(dayOne);
        var dayTwo = moment.unix(dataResponse.list[9].dt).utc().format("L");
        $("#day-two").prepend(dayTwo);
        //console.log(dayTwo);
        var dayThree = moment.unix(dataResponse.list[17].dt).utc().format("L");
        $("#day-three").prepend(dayThree);
        //console.log(dayThree);
        var dayFour = moment.unix(dataResponse.list[25].dt).utc().format("L");
        $("#day-four").prepend(dayFour);
        //console.log(dayFour);
        var dayFive = moment.unix(dataResponse.list[33].dt).utc().format("L");
        $("#day-five").prepend(dayFive);

        //icon variables//
        //day one//
        var fiveIcon = "http://openweathermap.org/img/wn/";
        var cityIcon = dataResponse.list[1].weather[0].icon; 
        var iconAt = "@2x.png";

        var icon = fiveIcon + cityIcon + iconAt;
        var img = $("<img>");
        img.attr("src", icon);

        $(".icon-one").prepend(img);


        //day two//
        var cityTwo = dataResponse.list[2].weather[0].icon;
        var iconTwo = fiveIcon + cityTwo + iconAt;
        var imgTwo = $("<img>");
        imgTwo.attr("src", iconTwo);

        $(".icon-two").prepend(imgTwo);

        //day three//
        var cityThree = dataResponse.list[3].weather[0].icon;
        var iconThree = fiveIcon + cityThree + iconAt;
        var imgThree = $("<img>");
        imgThree.attr("src", iconThree);

        $(".icon-three").prepend(imgThree);

        //day four//
        var cityFour = dataResponse.list[4].weather[0].icon;
        var iconFour = fiveIcon + cityFour + iconAt;
        var imgFour = $("<img>");
        imgFour.attr("src", iconFour);

        $(".icon-four").prepend(imgFour);

        //day five//
        var cityFive = dataResponse.list[5].weather[0].icon;
        var iconFive = fiveIcon + cityFive + iconAt;
        var imgFive = $("<img>");
        imgFive.attr("src", iconFive);

        $(".icon-five").prepend(imgFive);

        //temp variables//
        //day one//
        var temp = dataResponse.list[1].main.temp;
        //change the temp from celsius to farenheight 
            var f = ((temp - 273.15) * 1.8 + 32).toFixed(0);
            $(".temp-one").prepend("Temp: " + f + "°F");
        
        //day two//
        var temp2 = dataResponse.list[2].main.temp;
        //change the temp from celsius to farenheight 
            var f2 = ((temp2 - 273.15) * 1.8 + 32).toFixed(0);
            $(".temp-two").prepend("Temp: " + f2 + "°F");
        
        //day three//
        var temp3 = dataResponse.list[3].main.temp;
        //change the temp from celsius to farenheight 
            var f3 = ((temp3 - 273.15) * 1.8 + 32).toFixed(0);
            $(".temp-three").prepend("Temp: " + f3 + "°F");
        
        //day four//
        var temp4 = dataResponse.list[4].main.temp;
        //change the temp from celsius to farenheight 
            var f4 = ((temp4 - 273.15) * 1.8 + 32).toFixed(0);
            $(".temp-four").prepend("Temp: " + f4 + "°F");

        //day five//
        var temp5 = dataResponse.list[5].main.temp;
        //change the temp from celsius to farenheight 
            var f5 = ((temp5 - 273.15) * 1.8 + 32).toFixed(0);
            $(".temp-five").prepend("Temp: " + f5 + "°F");

        //humidity variables//
        //day one//
        var humidOne = dataResponse.list[1].main.humidity;
        $(".humid-one").append("Humidity: " + humidOne + "%");

        //day two//
        var humidTwo = dataResponse.list[2].main.humidity;
        $(".humid-two").append("Humidity: " + humidTwo + "%");

        //day three//
        var humidThree = dataResponse.list[3].main.humidity;
        $(".humid-three").append("Humidity: " + humidThree + "%");

        //day four//
        var humidFour = dataResponse.list[4].main.humidity;
        $(".humid-four").append("Humidity: " + humidFour + "%");

        //day five//
        var humidFive = dataResponse.list[5].main.humidity;
        $(".humid-five").append("Humidity: " + humidFive + "%");
      
    })

}