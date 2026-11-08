const apiKey = "610f01d0fa7589c4a07adc12a86f9bbc";

const weatherdata = document.querySelector("#weatherdata");
const fetchWeather = document.querySelector("#fetchWeather");


const city = document.querySelector("#city");
const citysearch = document.querySelector("#citysearch");
const searchBtn = document.querySelector("#search");


city.addEventListener("change", function() {
    console.log(city.value);
    });


document.querySelector("#fetchWeather").addEventListener("click", async function () {
    weatherdata.textContent = "Loading weather data...";
    const kaupunki = city.value;

    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&units=metric&mode=xml&APPID=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);

        }

        const xmlText = await response.text();

        const xml = new DOMParser().parseFromString(xmlText, "application/xml");


        const temperatureElement = xml.querySelector("temperature");
        const temperature = temperatureElement.getAttribute("value");

        const cloudsElement = xml.querySelector("clouds");
        const clouds = cloudsElement.getAttribute("value");

        const humidityElement = xml.querySelector("humidity");
        const humidity = humidityElement.getAttribute("value");


        weatherdata.textContent = 
        `${kaupunki}:
        Lämpötila on ${temperature} astetta.
        Pilvisyys on ${clouds}.
        Kosteus on ${humidity}.`;


    } catch (error) {
        weatherdata.textContent = `Error: ${error.message}`;
    };
    
});

searchBtn.addEventListener("click", async function () {
    const kaupunki = citysearch.value;

    const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&units=metric&mode=xml&APPID=${apiKey}`
    );

    const xmlText = await response.text();

    const xml = new DOMParser().parseFromString(xmlText, "application/xml");

    if (response.ok) {
        const temperatureElement = xml.querySelector("temperature");
        const temperature = temperatureElement.getAttribute("value");

        const cloudsElement = xml.querySelector("clouds");
        const clouds = cloudsElement.getAttribute("value");

        const humidityElement = xml.querySelector("humidity");
        const humidity = humidityElement.getAttribute("value");

        weatherdata.textContent = 
        `${kaupunki}:
        Lämpötila on ${temperature} astetta.
        Pilvisyys on ${clouds}.
        Kosteus on ${humidity}.`;
    } else {
        weatherdata.textContent = "Kaupunkia ei löytynyt.";
    };
    
});
  