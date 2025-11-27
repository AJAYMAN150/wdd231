/* weather.js
   Fetches current weather and 3-day forecast for Tonga Chamber location.
   Fills #current-temp, #weather-desc, and #forecast-list in index.html
*/

const WEATHER_API_KEY = "eb84dbd79deb55693e1be2c92d06cd4a"; // replace with your key
const LAT = -21.1391;  // Nukuʻalofa latitude
const LON = -175.2041; // Nukuʻalofa longitude

document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
});

async function fetchWeather() {
    const tempEl = document.getElementById("current-temp");
    const descEl = document.getElementById("weather-desc");
    const forecastEl = document.getElementById("forecast-list");

    if (!WEATHER_API_KEY) {
        tempEl.textContent = "--";
        descEl.textContent = "Add API key in weather.js";
        forecastEl.innerHTML = "<li>Forecast unavailable</li>";
        return;
    }

    try {
        // CURRENT WEATHER
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;
        const currentRes = await fetch(currentUrl);
        if (!currentRes.ok) throw new Error("Current weather fetch failed");
        const currentData = await currentRes.json();

        tempEl.textContent = Math.round(currentData.main.temp);
        descEl.textContent = capitalize(currentData.weather[0].description);

        // 3-DAY FORECAST
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&cnt=24&appid=${WEATHER_API_KEY}`;
        // 'cnt=24' gives 3 days with 8 entries/day (3-hour increments)
        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) throw new Error("Forecast fetch failed");
        const forecastData = await forecastRes.json();

        // Build daily forecast from 3-hour data
        const dailyTemps = {};
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!dailyTemps[date]) dailyTemps[date] = { min: item.main.temp, max: item.main.temp };
            dailyTemps[date].min = Math.min(dailyTemps[date].min, item.main.temp);
            dailyTemps[date].max = Math.max(dailyTemps[date].max, item.main.temp);
        });

        forecastEl.innerHTML = "";
        let count = 0;
        for (let day in dailyTemps) {
            if (count >= 3) break; // only 3 days
            const temps = dailyTemps[day];
            const dateObj = new Date(day);
            const dayLabel = dateObj.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
            const li = document.createElement("li");
            li.textContent = `${dayLabel}: ${Math.round(temps.max)}° / ${Math.round(temps.min)}°`;
            forecastEl.appendChild(li);
            count++;
        }

    } catch (err) {
        console.error(err);
        tempEl.textContent = "--";
        descEl.textContent = "Weather unavailable";
        forecastEl.innerHTML = "<li>Forecast unavailable</li>";
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
