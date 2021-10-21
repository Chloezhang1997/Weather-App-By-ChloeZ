function getDateTime() {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let now = new Date();
    // let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = days[now.getDay()];
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if (month.toString().length === 1) {
      month = "0" + month;
    }
    if (day.toString().length === 1) {
      day = "0" + day;
    }
    if (hour.toString().length === 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    if (second.toString().length === 1) {
      second = "0" + second;
    }
    var dateTime = day + " " + hour + ":" + minute + ":" + second;
    return dateTime;
  }
  
  setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("digital-clock").innerHTML = currentTime;
  }, 1000);
  
  function convertToFahrenheit(event) {
    event.preventDefault();
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
  }
  
  let currentTime = new Date();
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
  function showTemperature(response) {
    console.log(response);
    let cityTemp = Math.round(response.data.main.temp);
    let tempNumber = document.querySelector("#temperature");
    tempNumber.innerHTML = `${cityTemp}°F`;
    let h1 = document.querySelector(".location");
    h1.innerHTML = response.data.name;
  }
  
  function city(event) {
    event.preventDefault();
  
    let cityInput = document.querySelector("#city-input");
    let units = "imperial";
    let apiKey = "002c6c2205afdd4fb34a1392f8b68aca";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showTemperature);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", city);
  
  //2
  
  function showWeather(response) {
    let h4 = document.querySelector("h4");
    let temperature = Math.round(response.data.main.temp);
    h4.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
  }
  
  function retrievePosition(position) {
    let apiKey = "002c6c2205afdd4fb34a1392f8b68aca";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  
  navigator.geolocation.getCurrentPosition(retrievePosition);
  
  function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      axios.get(geoFindMe).then(showTemperature);
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  document
    .querySelector("#current-location-button")
    .addEventListener("click", geoFindMe);
  