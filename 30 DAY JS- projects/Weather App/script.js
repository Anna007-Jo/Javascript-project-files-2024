const apiKey = "1c330f6215a19608deb8b1b07e757c92";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return; // Exit function early to prevent unnecessary code execution
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update weather icon based on weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "weather-app-img/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "weather-app-img/images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "weather-app-img/images/rain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "weather-app-img/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error").textContent = "Invalid city name";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
