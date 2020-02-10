//I want to date to display//
$('.time').text(moment().format("dddd, MMM Do, YYYY")); 

// Key Variable
// var APIKey = "94fb4992412a398a9fb2333272321439";

// function with the URL we need to query the database
function weatherDaily(cityValue) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityValue+"&appid=aa5b71088d417c59bb0ed00cd6cfe06e"

    var citiesArray = JSON.parse(localStorage.getItem('city')) || [];

    $(document).ready(function() {
      
      var city = citiesArray[citiesArray.length - 1];
      fiveDay(city);
      citySearch(city);
    });

     // clear out previous city data
     $(".city-name").empty();
     $(".temperature").empty();
     $(".humidity").empty();
     $(".wind").empty();
     $(".uv-index").empty();
     var citySearch = queryURL;
     console.log(citySearch);

      // ajax for searching for new city to display
      $.ajax({
        url: citySearch,
        method: "GET"
      }).then(function(response) {
        // * Display the following under current weather conditions:
        //  line one
        //   * City
        var cityInfo = response.name;
        console.log(cityInfo);
        //   * Icon image (visual representation of weather conditions)
        // Where are we pulling the icons from and how
        var iconDummy = "https://openweathermap.org/img/wn/";
        var iconPng = "@2x.png";
        var iconWeather = response.weather[0].icon;
        var iconUrl = iconDummy + iconWeather + iconPng;
        console.log(iconUrl);
        var iconImg = $("<img>");
        iconImg.attr("src", iconUrl);
        $(".city").append(cityInfo + " ");
        $(".city").append(iconImg);
        // line two
        //   * Temperature
        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        console.log(response.main.temp);
        var K = response.main.temp;
        console.log(K);
        var F = ((K - 273.15) * 1.8 + 32).toFixed(0);
        console.log(F);
        $(".temperature").append("Temperature: " + F + " °F");
        //   * UV index
        // PULL LON/LAT INFO REPONSE.COORD.LON AND RESPONSE.COORD.LAT
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        // SEND OVER TO uvIndex()
        uvIndex(lon, lat);
      });
    }


//on click function, saving the city value in local storage
$(".btn").on('click', function(){
    console.log("good job!");
    var cityValue = $(".city").val().trim();
    localStorage.setItem('city', cityValue);

    // var cityArray = JSON.parse(localStorage.getItem('city')) || [];

    // $(".city").val(localStorage.getItem('city')); 

    weatherDaily(cityValue);
})
