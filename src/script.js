function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let week = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = week[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row align-items-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
            <div class="col weather-forecast-day1">
              <div class="weather-forecast-day1-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="Weather forecast image"
              class="weather-forecast-day1-img"
              />
            <div class="weather-forecast-day1-temperatures">
              <strong><span class="weather-forecast-day1-temp-max">${Math.round(
                forecastDay.temp.max
              )}º</strong></span>
              <span class="weather-forecast-day1-temp-min">${Math.round(
                forecastDay.temp.min
              )}º</span>
            </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  let apiKey = `f37ae7e0407a8ea1d736a1fcc1e6133a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector(".city");
  let tempElement = document.querySelector(".number");
  let descriptionElement = document.querySelector(".desc");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let dateElement = document.querySelector(".date-time");
  let iconElement = document.querySelector(".icon");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].main`);

  getForcast(response.data.coord);
}

function displayFahrenTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".number");
  celsiusLink.classList.remove("active");
  fahrenLink.classList.add("active");
  let fahrenTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenTemp);
}

function displayCelsTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".number");
  fahrenLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenLink = document.querySelector(".fahrenheit");
fahrenLink.addEventListener("click", displayFahrenTemp);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelsTemp);

function search(city) {
  let apiKey = `f37ae7e0407a8ea1d736a1fcc1e6133a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

search("Tallinn");
