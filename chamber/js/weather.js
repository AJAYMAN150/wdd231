/* weather.js
   Fetches current weather and 3-day forecast for Tonga Chamber location.
   Fills #current-temp, #weather-desc, and #forecast-list in index.html
*/

const WEATHER_API_KEY = "eb84dbd79deb55693e1be2c92d06cd4a"; // <-- replace with your key
const LAT = -21.1391;  // Nukuʻalofa latitude
const LON = -175.2041; // Nukuʻalofa longitude

document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
});

async function fetchWeather() {
    const tempEl = document.getElementById("current-temp");
    const descEl = document.getElementById("weather-desc");
    const forecastEl = document.getElementById("forecast-list");

    if (!WEATHER_API_KEY || WEATHER_API_KEY === "eb84dbd79deb55693e1be2c92d06cd4a") {
        tempEl.textContent = "--";
        descEl.textContent = "Add API key in weather.js";
        forecastEl.innerHTML = "<li>Forecast unavailable</li>";
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather fetch failed");

        const data = await res.json();

        // Current weather
        const currentTemp = Math.round(data.current.temp);
        const currentDesc = data.current.weather[0].description;

        tempEl.textContent = currentTemp;
        descEl.textContent = capitalize(currentDesc);

        // 3-day forecast (next 3 days)
        forecastEl.innerHTML = "";
        for (let i = 1; i <= 3; i++) {
            const day = data.daily[i];
            const date = new Date(day.dt * 1000);
            const dayLabel = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
            const tempMin = Math.round(day.temp.min);
            const tempMax = Math.round(day.temp.max);

            const li = document.createElement("li");
            li.textContent = `${dayLabel}: ${tempMax}° / ${tempMin}°`;
            forecastEl.appendChild(li);
        }

    } catch (err) {
        console.error(err);
        tempEl.textContent = "--";
        descEl.textContent = "Weather unavailable";
        forecastEl.innerHTML = "<li>Forecast unavailable</li>";
    }
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
