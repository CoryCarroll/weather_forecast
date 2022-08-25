// Create Variables
var apiKey = "c722761f5d2edd4c109c4ed85bc9bc0a"
var cityEl = $('.city');
var tempEl = $('#temperature');
var humid = $('#humidity');
var windEl = $('#wind');
var uvEl = $('#UV');
var searchBtn = $('#btn');
var citySearch = $('#city');

searchBtn.on('click', function () {
    displayWeather(citySearch.val());
    console.log('clicked!');
});

function displayWeather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
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
            var currentUV = "UV: " + oneCallData.current.uvi
            uvEl.html(currentUV)
            
            if (currentUV <= 2) {
                $(uvEl).addClass("favorable");
              } else if (currentUV >= 3 && currentUV <= 5) {
                $(uvEl).addClass("moderate");
              } else {
                $(uvEl).addClass("severe");
              }
            
            for (var i = 0; i < 5; i++) {

                var cardRowEl = document.querySelector("#cardRow");
                var cardEl = document.createElement('div');
                cardEl.classList.add("custom-card");
                cardEl.classList.add("col");
                cardRowEl.append(cardEl);
               
                var dateEl = document.createElement('div');
                var dateData = moment.unix(oneCallData.daily[i].dt).format("MM/DD/YYYY")
                dateEl.innerHTML = dateData;
                dateEl.classList.add("custom-header");
                cardEl.append(dateEl);
                
                var imgEl = document.createElement('img');
                var icon = oneCallData.daily[i].weather[0].icon;
                var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
                imgEl.setAttribute('src', iconUrl);
                cardEl.append(imgEl);
               
                var temp = document.createElement('p');
                var tempData = oneCallData.daily[i].temp.day
                temp.innerHTML = "Temp: " + tempData + "\u00B0" + " F";
                cardEl.append(temp);
               
                var wind = document.createElement('p');
                var windData = oneCallData.daily[i].wind_speed
                wind.innerHTML = "Wind: " + windData + " MPH";
                cardEl.append(wind);
                
                var humidity = document.createElement('p');
                var humidityData = oneCallData.daily[i].humidity
                humidity.innerHTML = "Humidity: " + humidityData + "%";
                cardEl.append(humidity);
            }
        })
        })
    }

    function saveCity() {
        var newCity = document.querySelector(cityEl).value;
        
        localStorage.getItem('Cities:')
        localStorage.setItem('Cities:', cityEl);
        console.log(localStorage);
        var oldCity = JSON.parse(localStorage.getItem('Cities:'));
        oldCity.push(newCity);
        
        localStorage.setItem('Cities:', JSON.stringify(oldCity));
      }