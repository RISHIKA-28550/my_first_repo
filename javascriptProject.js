function refreshWeatherDetails(response) {
  let mainTempElement = document.querySelector("#current-temp");
  let currTemp = Math.round(response.data.temperature.current);
  mainTempElement.innerHTML = `${currTemp}`;

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let mainCityheading = document.querySelector("h1");
  // mainCityheading.innerHTML = response.data.city;
  new Typewriter("h1", {
    strings: response.data.city,
    autoStart: true,
    cursor: null,
  });

  let mainEmoji = document.querySelector("#main-temp-emoji");
  mainEmoji.innerHTML = `<img src="${response.data.condition.icon_url}" alt="main-emoji" class="main-emoji"/>`;

  //date and time change
  let currDayandTime = document.querySelector("#dayAndTime");
  let date = new Date(response.data.time * 1000);
  currDayandTime.innerHTML = formatDate(date);

  //video change

  const video = document.querySelector("#videobg");

  function changeVideoSmoothly(newSrc) {
    video.classList.add("fade-out");

    video.addEventListener("transitionend", function handleFade() {
      video.innerHTML = `<source id="video-source" src="${newSrc}" type="video/mp4">`;
      video.load();
      video.play();

      video.classList.remove("fade-out");

      video.removeEventListener("transitionend", handleFade);
    });
  }

  let details = response.data.condition.description;

  if (
    details.includes("rain") ||
    details.includes("drizzle") ||
    details.includes("shower")
  ) {
    changeVideoSmoothly("videos/rain.mp4");
  } else if (details.includes("cloud") || details.includes("overcast")) {
    changeVideoSmoothly("videos/videocloud.mp4");
  } else if (details.includes("clear") || details.includes("sunny")) {
    changeVideoSmoothly("videos/sunny.mp4");
  } else if (
    details.includes("fog") ||
    details.includes("mist") ||
    details.includes("haze") ||
    details.includes("smoke")
  ) {
    changeVideoSmoothly("videos/haze.mp4");
  } else if (
    details.includes("wind") ||
    details.includes("breeze") ||
    details.includes("gust")
  ) {
    changeVideoSmoothly("videos/wind.mp4");
  }

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let result = `${day} ${hour}:${minutes}`;
  return result;
}

function getForecast(city) {
  let myapiKey = `bafoe10ec41e43fbd136804atbea3503`;
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${myapiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "bafoe10ec41e43fbd136804atbea3503";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeatherDetails);
}

function handleSEarchSubmit(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#searchcity");
  searchCity(cityEntered.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSEarchSubmit);

searchCity("New Delhi");

//WEATHER FORECAST

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-days">
          <div class="weather-forecast-day">${formatDayForecast(day.time)}</div>
          <div class="weather-forecast-icon">
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temp">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temp">
              ${Math.round(day.temperature.minimum)}°
            </div>
          </div>  
        </div>
    `;
    }
  });
  forecast.innerHTML = forecastHtml;
}

let forecast = document.querySelector("#forecast");

let input = document.getElementById("searchcity");

input.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    this.classList.add("filled");
  } else {
    this.classList.remove("filled");
  }
});
