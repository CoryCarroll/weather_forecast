// Create Variables
var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
var searchEl = document.querySelector('#search-box');
var searchBtn = document.querySelector('#searchBtn');
var resultsEl = document.querySelector('#results-container');
var cityEl = document.querySelector('#city-container');











function getApi() {
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for(var i = 0; i < data.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = data[i].html_url;

            
        }
    })
}