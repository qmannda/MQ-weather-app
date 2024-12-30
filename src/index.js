function updateTemp(response) {
  let tempRightNow = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="weather-icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  tempRightNow.innerHTML = Math.round(temp);

  getForecastData(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
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

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minute}`;
}

function searchCity(city) {
  let apiKey = "e3baoc44e6718daa5fte65cbd6d06a5b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function searchInfo(event) {
  event.preventDefault();
  let inputInfo = document.querySelector("#search-input");

  searchCity(inputInfo.value);
}

function getForecastData(city) {
  let apiKey = "e3baoc44e6718daa5fte65cbd6d06a5b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let imini = [`Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let forecastHtml = "";

  imini.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-day">
            <div class="forecast-date">${day}</div>
            <div class="forecast-icon">⛅</div>
            <div class="forecast-temp">
              <div class="temp-high">
                <strong>15°</strong>
              </div>
              <div class="temp-high">9°</div>
            </div>
          </div>
          `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchInfo);

searchCity("Pretoria");
