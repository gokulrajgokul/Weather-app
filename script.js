const form = document.getElementById("weatherform");
const cityinput = document.getElementById("city");
const weatherresult = document.querySelector("#weatherresults"); // Assuming only one result container

const API_KEY = "18433ce325c5c3cd0e0b836217ab0a27";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityinput.value.trim();

    if (!city) {
        weatherresult.innerHTML = "<p>Please enter a city</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units-metric`
        );

        if (!response.ok) {
            weatherresult.innerHTML = `<p>City not found. Please try again.</p>`;
            return;
        }

        const data = await response.json();

        weatherresult.innerHTML = `
            <h2>Weather in ${data.name},${data.sys.country}</h2>
            <div class="results">
            <div class="weatherresult">
               <i class="fa-solid fa-temperature-three-quarters"></i>
               <p>Temperature: ${data.main.temp}°C</p>
            </div>
            <div class="weatherresult">
               <i class="fa-solid fa-temperature-half"></i>
                  <p>Weather: ${data.weather[0].description}</p>
            </div>
            <div class="weatherresult">
               <i class="fa-solid fa-droplet"></i>
               <p>Humidity: ${data.main.humidity}%</p>
            </div>
            <div class="weatherresult">
               <i class="fa-solid fa-wind"></i>
               <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
            </div>
            
            `;


        } catch (error) {
        weatherresult.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        console.error("Error:", error);
    }
});
