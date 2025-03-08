const inputBox = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

const API_KEY = 'abcd601a8f36b5b51c00e8dca2aca5c0';  // Replace with a valid API key

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === '404') {
            locationNotFound.style.display = 'flex';
            weatherBody.style.display = 'none';
            console.log("Error: Location not found.");
            return;
        }

        weatherBody.style.display = 'flex';
        locationNotFound.style.display = 'none';

        temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} m/s`;

        // Fixing the weather image display issue
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        const weatherIcons = {
            clouds: './assets/cloud.png',
            clear: './assets/clear.png',
            rain: './assets/rain.png',
            mist: './assets/mist.png',
            snow: './assets/snow.png',
            drizzle: './assets/rain.png',
            thunderstorm: './assets/thunderstorm.png',
            haze: './assets/mist.png',
            smoke: './assets/mist.png',
            fog: './assets/mist.png',
            dust: './assets/mist.png',
            sand: './assets/mist.png',
            ash: './assets/mist.png',
            squall: './assets/mist.png',
            tornado: './assets/mist.png'
        };

        weatherImg.src = weatherIcons[weatherCondition] || './assets/default.png';

        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for button click
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value.trim());
});

// Event listener for "Enter" key press
inputBox.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        checkWeather(inputBox.value.trim());
    }
});
