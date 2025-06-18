//real time temperature

function showCurrTempandCity(response) {
  let currTemp = Math.round(response.data.temperature.current);
  let mainTempElement = document.querySelector("#current-temp");
  mainTempElement.innerHTML = `${currTemp}`;

  let mainheading = document.querySelector("h1");
  mainheading.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "bafoe10ec41e43fbd136804atbea3503";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrTempandCity);
}

function handleSEarchSubmit(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#searchcity");
  searchCity(cityEntered.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSEarchSubmit);

searchCity("New Delhi");

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
