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
    let year = now.getFullYear();
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
 function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
 
  let currentTime = new Date();
  

  
  function showTemperature(response) {
    console.log(response);
    let cityTemp = Math.round(response.data.main.temp);
    let tempNumber = document.querySelector("#temperature");
    tempNumber.innerHTML = `${cityTemp}`;
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
  
  
  
    
    
    
    function displayTemperature(response) {
      let temperatureElement = document.querySelector("#temperature");
      let cityElement = document.querySelector("#city");
      let descriptionElement = document.querySelector("#description");
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let dateElement = document.querySelector("#date");
      let iconElement = document.querySelector("#icon");
    
      celsiusTemperature = response.data.main.temp;
    
      temperatureElement.innerHTML = Math.round(celsiusTemperature);
      cityElement.innerHTML = response.data.name;
      descriptionElement.innerHTML = response.data.weather[0].description;
      humidityElement.innerHTML = response.data.main.humidity;
      windElement.innerHTML = Math.round(response.data.wind.speed);
      dateElement.innerHTML = formatDate(response.data.dt * 1000);
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);
    
      getForecast(response.data.coord);
    }
    
    function search(city) {
      let apiKey = "002c6c2205afdd4fb34a1392f8b68aca";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);
    }
    
    function handleSubmit(event) {
      event.preventDefault();
      let cityInputElement = document.querySelector("#city-input");
      search(cityInputElement.value);
    }
    
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);
   d
    search("New York");