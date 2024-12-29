function updateTemp(response) {
  let tempRightNow = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  tempRightNow.innerHTML = Math.round(temp);
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

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchInfo);

searchCity("Pretoria");
