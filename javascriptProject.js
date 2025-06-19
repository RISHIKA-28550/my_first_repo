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
  mainCityheading.innerHTML = response.data.city;

  let mainEmoji = document.querySelector("#main-temp-emoji");
  mainEmoji.innerHTML = `<img src="${response.data.condition.icon_url}" alt="main-emoji" class="main-emoji"/>`;

  //date and time change

  let currDayandTime = document.querySelector("#dayAndTime");
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  currDayandTime.innerHTML = `${day} ${hour}:${minutes}`;

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
    changeVideoSmoothly("videos/scatteredclouds.mp4");
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
    changeVideoSmoothly("videos/scatteredclouds.mp4");
  }
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

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast-days">
          <div class="weather-forecast-day">${day}</div>
          <div class="weather-forecast-icon">☀️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temp">
              <strong>15°</strong>
            </div>
            <div class="weather-forecast-temp">
              9°
            </div>
          </div>  
        </div>
    `;
  });
  forecast.innerHTML = forecastHtml;
}

let forecast = document.querySelector("#forecast");
displayForecast();

// const video = document.querySelector("#videobg");
// const source = document.getElementById("video-source");
// if () {
//   source.setAttribute("src", "rain.mp4");
// } else if (description.textContent.toLowerCase().includes("clouds")) {
//   source.setAttribute("src", "scatteredclouds.mp4");
// } else {
//   source.setAttribute("src", "videocloud.mp4");
// }

// video.load(); // reload the new video
// video.play();
