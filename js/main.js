let apiKey = 'c5e4093e2a52e7591a3862ec4dd67f57';

window.addEventListener('load', setCityName);

const form = document.querySelector('#cityNameInfoForm');

form.addEventListener('submit', setCityName)

function setCityName(event) {
    event.preventDefault();
    let cityName = document.querySelector('#cityName');
    let jsonData = getData(cityName);
    loadData(jsonData);
}

const getData = async (cityName) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&APPID=${apiKey}&units=imperial`)
    return response.data
}

// Create Constants to hold DOM Elements
const DOMElements = {
    weatherCityAndTime: '.city-name',
    weatherTempAndGroup: '.temp-and-group',
    weatherWindSpeedHumidityAndCloudiness: '.wind-humid-clouds',
    weatherIcon: '.image'
}

// Creation of the HTML Injections
const createCityNameAndTime = (name, unix_timestamp) => {
    let time = new Date(unix_timestamp * 1000).toLocaleTimeString("en-US");
    // let time = date.getHours() + ":" + date.getMinutes();
    const htmlCityNameAndTime = `<h6 class="flex-grow-1">${name}</h6>
                                 <h6>${time}</h6>`
    document.querySelector(DOMElements.weatherCityAndTime).insertAdjacentHTML('beforeend', htmlCityNameAndTime)
}

const createTempAndGroup = (temp, group) => {
    const htmlTempAndGroup = `
        <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${temp}°F </h6>
        <span class="small" style="color: #868B94">${group}</span>`
        console.log(group)
    document.querySelector(DOMElements.weatherTempAndGroup).insertAdjacentHTML('beforeend', htmlTempAndGroup)
}

const createWindSpeedHumidityAndCloudiness = (maxTemp, minTemp, windSpeed, humidity, cloudiness) => {
    const htmlWindSpeedHumidityAndCloudiness = `
    <div><i class="fas fa-fw" style="color: #868B94;">Hi</i> <span class="ms-1"> ${maxTemp}°F</span></div>
    <div><i class="fas fa-fw" style="color: #868B94;">Lo</i> <span class="ms-1"> ${minTemp}°F</span></div>
    <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${windSpeed} mph </span></div>
    <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${humidity} % </span></div>
    <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${100 - cloudiness} % </span></div>` // Actually giving % of sun
    document.querySelector(DOMElements.weatherWindSpeedHumidityAndCloudiness).insertAdjacentHTML('beforeend', htmlWindSpeedHumidityAndCloudiness)
}

const createWeatherImage = (icon) => {
    const htmlWeatherImage = `<img src="https://openweathermap.org/img/wn/${icon}.png" width="100px">`
    document.querySelector(DOMElements.weatherIcon).insertAdjacentHTML('beforeend', htmlWeatherImage)
}

// Function to Load Data and Display HTML
const loadData = async (jsonData) => {
    const weatherItems = await jsonData;
    createCityNameAndTime(weatherItems.name, weatherItems.dt);
    createTempAndGroup(weatherItems.main.temp, weatherItems.weather[0].main);
    createWindSpeedHumidityAndCloudiness(weatherItems.main.temp_max, weatherItems.main.temp_min, weatherItems.wind.speed, weatherItems.main.humidity, weatherItems.clouds.all);
    createWeatherImage(weatherItems.weather[0].icon);
}

// Function to Clear Data from HTML
onclick="clearData()"
const clearData = () => {
    document.querySelector(DOMElements.weatherCityAndTime).innerHTML = "";
    document.querySelector(DOMElements.weatherTempAndGroup).innerHTML = "";
    document.querySelector(DOMElements.weatherWindSpeedHumidityAndCloudiness).innerHTML = "";
    document.querySelector(DOMElements.weatherIcon).innerHTML = "";
}