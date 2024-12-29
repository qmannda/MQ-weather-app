function searchInfo(event) {
  event.preventDefault();
  let inputInfo = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = inputInfo.value;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchInfo);
