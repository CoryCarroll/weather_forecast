// Create Variables
var apiKey = "c722761f5d2edd4c109c4ed85bc9bc0a"
var cityEl = $('.city')
var tempEl = $('#temperature')
var humid = $('#humidity')
var windEl = $('#wind')
var uvEl = $('#UV')
var forecast = $('#forecast')
var searchBtn = $('#btn');
var citySearch = $('#city')

searchBtn.on('click', function () {
    displayWeather(citySearch.val());
    console.log('clicked!');
});

function displayWeather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        var queryOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`
        fetch(queryOneCall)
        .then(function(response){
            console.log(data);
            return response.json()
        })
        .then(function(oneCallData){
            console.log(oneCallData)
            var date = moment(data.dt, "X").format(" MM/DD/YYYY")
            var cityName = data.name
            var icon = `<img src ="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
            cityEl.empty()
            cityEl.append(cityName, date, icon)
            var currentTemp = "Temp: " + data.main.temp + "\u00B0" + " F"
            tempEl.html(currentTemp)
            var currentHumid = "Humidity: " + data.main.humidity + " %"
            humid.html(currentHumid)
            var windSpeed = "Wind: " + data.wind.speed + " MPH"
            windEl.html(windSpeed)
        })
        .then((oneCallData) => {           
            for (var i = 0; i < 5; i++) {
                forecast.append(oneCallData[i]);
            }
        })
    }
    )
}


function setUVIndexColor(uvIndex) {
    if (uvIndex < 3) {
        return 'green';
    } else if (uvIndex >= 3 && uvIndex < 6) {
        return 'yellow';
    } else if (uvIndex >= 6 && uvIndex < 8) {
        return 'orange';
    } else if (uvIdex >= 8 && uvIndex < 11) {
        return 'red';
    } else return 'purple';
}