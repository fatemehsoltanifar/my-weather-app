function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
function formatDay(date) {
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let formattedDay = days[day];
  return `${formattedDay}`;
}

function displayTemperature(response) {  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateELement.innerHTML = formatDate(currentDate);
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  document.querySelector('#description').innerHTML = response.data.condition.description
  document.querySelector('#humidity').innerHTML = `${response.data.temperature.humidity}%`
  document.querySelector('#wind').innerHTML = `${response.data.wind.speed}km/h`
  iconElement = `<img src="${response.data.condition.icon_url}" id="icon-image">`
  document.querySelector('#icon').innerHTML = iconElement
}

function displayForecast(response){
  console.log(response.data)
  console.log(formatDay(new Date(response.data.daily[1].time*1000)))
  let forecastElement = ''
  let sixDayForecast = response.data.daily
  sixDayForecast.pop()
  sixDayForecast.forEach(element =>
    {
      let text = `
      <div class="forecast-element">
        <div class="forecast-day">${formatDay(new Date(element.time*1000))}</div>
        <img src="${element.condition.icon_url}">
        <div class="minmax">
          <span class="max-temp">${Math.round(element.temperature.maximum)}°</span><span>${Math.round(element.temperature.minimum)}°</span>
        </div>
      </div>
      `
      forecastElement = forecastElement + text
    })
  document.querySelector('#forecast-weather').innerHTML = forecastElement

}
  
  function getTemp(city){
    //let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiKey = "c5cbc3662fo6b744db530ff0tbd4d6fa";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  function getForecast(city){
    //let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiKey = "c5cbc3662fo6b744db530ff0tbd4d6fa";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value; 
    getTemp(city) 
    getForecast(city)  
  }
  
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateELement.innerHTML = formatDate(currentDate);

  getTemp('Paris')
  getForecast('Paris')
  