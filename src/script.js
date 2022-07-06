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

function showTemp(response) {
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

search("Tallinn");

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);
