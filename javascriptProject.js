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
