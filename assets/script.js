//Sets the Date and time for today at the top
var todaysDate = dayjs().format('dddd D MMMM YYYY - h:mm A');
$('#currentDay').text(todaysDate);

//open weather API key and setting var for elements
var apiKey = '4bcdb09905036742ab7b420bef55670d';
var cityInput = document.getElementById('city-input');
var searchbtn = document.getElementById('searchbtn');
var timeEl =document.getElementById('time');
var dateEl =document.getElementById('date');
var searchHistory =document.querySelector("#search-history-list");
var searchForm = document.querySelector('#user-form');

//fetching the data from the openweathermap API
function fetchWeather(event){
    event.preventDefault();
    var cityName = cityInput.value
    console.log(cityName);
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=4bcdb09905036742ab7b420bef55670d&units=imperial"
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            // console.log(data)
            this.showCurrentWeather(data)
        })
}    

//gets the current weather data
var showCurrentWeather = function(data){
    // enters the data into the card

    document.getElementById('city-name').innerText = "Weather for " + data.name;
    document.getElementById('current-temp').innerText = "Temperature: " + data.main.temp + "°F";
    document.getElementById('current-humidity').innerText = "Humidity: " + data.main.humidity + "%";
    document.getElementById('current-wind').innerText = "Wind Speed: " + data.wind.speed + "km/h";
    $('.weatherIcon').html("<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");

};

//five-day forecast data

function fetchForecast (event){
    event.preventDefault();
    var cityName = cityInput.value
    var requestForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=4bcdb09905036742ab7b420bef55670d&units=imperial"
    fetch(requestForecastUrl)
        .then(function (response) {
            return response.json();
    })
        .then(function (data){
            console.log(data)
            this.showForecastData(data)
    })
}    

//five day forcasts data input to html
var showForecastData = function(data){
    $('.card-date-one').text(data.list[0].dt_txt);
    $('.temp-day-one').text("Temperature: " + data.list[0].main.temp + "°F");
    $('.humidity-day-one').text("Humidity: " + data.list[0].main.humidity + "%");
    $('.wind-day-one').text("Wind Speed: " + data.list[0].wind.speed + "km/h");
    $('.weatherIconDay').html("<img src='https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png'>");

    $('.card-date-two').text(data.list[7].dt_txt);
    $('.temp-day-two').text("Temperature: " + data.list[7].main.temp + "°F");
    $('.humidity-day-two').text("Humidity: " + data.list[7].main.humidity + "%");
    $('.wind-day-two').text("Wind Speed: " + data.list[7].wind.speed + "km/h");
    $('.weatherIconDay').html("<img src='https://openweathermap.org/img/w/" + data.list[7].weather[0].icon + ".png'>");

    $('.card-date-three').text(data.list[15].dt_txt);
    $('.temp-day-three').text("Temperature: " + data.list[15].main.temp + "°F");
    $('.humidity-day-three').text("Humidity: " + data.list[15].main.humidity + "%");
    $('.wind-day-three').text("Wind Speed: " + data.list[15].wind.speed + "km/h");
    $('.weatherIconDay').html("<img src='https://openweathermap.org/img/w/" + data.list[15].weather[0].icon + ".png'>");

    $('.card-date-four').text(data.list[23].dt_txt);
    $('.temp-day-four').text("Temperature: " + data.list[23].main.temp + "°F");
    $('.humidity-day-four').text("Humidity: " + data.list[23].main.humidity + "%");
    $('.wind-day-four').text("Wind Speed: " + data.list[23].wind.speed + "km/h");
    $('.weatherIconDay').html("<img src='https://openweathermap.org/img/w/" + data.list[23].weather[0].icon + ".png'>");

    $('.card-date-five').text(data.list[31].dt_txt);
    $('.temp-day-five').text("Temperature: " + data.list[31].main.temp + "°F");
    $('.humidity-day-five').text("Humidity: " + data.list[31].main.humidity + "%");
    $('.wind-day-five').text("Wind Speed: " + data.list[31].wind.speed + "km/h");
    $('.weatherIconDay').html("<img src='https://openweathermap.org/img/w/" + data.list[31].weather[0].icon + ".png'>");
}

//allows for the search button to work on click
searchbtn.addEventListener('click',function(event){
    fetchWeather(event)
    fetchForecast(event)
});

function searchHistory(){
    var lastSearched = []
    searchHistory.innerHTML = "";
    todoCountSpan.textContent = lastSearched.length;

    for (var i = 0; i < lastSearched.length; i++) {
      var search = lastSearched[i];
  
      var li = document.createElement("li");
      li.textContent = search;
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = "Complete ✔️";
  
      li.appendChild(button);
      searchHistory.appendChild(li);
    }
}

function init() {
    var storedSearches = JSON.parse(localStorage.getItem("lastSearched"));

    if (storedSearches !== null) {
        lastSearched = storedSearches;
    }

    searchHistory();
}

function storeHistory() {
    localStorage.setItem("lastSearched", JSON.stringify(lastSearched));
}

searchForm.addEventListener("submit", function(event){
    event.preventDefault();

    var searchInput = cityInput.value.trim();

    if (searchInput === "") {
        return;
    }

    lastSearched.push(searchInput);
    cityInput.value = "";

    storeHistory();
    searchHistory();
})
