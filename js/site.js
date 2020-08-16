const clock = document.querySelector(".js-clock");

function date(){
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;

}

const body = document.querySelector("body");

const IMG_Number = 10;


function paintImage(IMG_Number){
  const image = new Image();
  image.src = `C:/Users/kkjh6/Documents/GitHub/ing/image/${IMG_Number}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);

}

function genRandom(){
  const number = Math.floor(Math.random() * 10 + 1);
  return number;

}

const weather = document.querySelector(".js-weather");

const API_KEY = `2764408e8965bae8332c8b0f37e238ab`;

const COORDS = `coords`;

function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response){
   return  response.json();
 }).then(function(json){
    const temp = json.main.temp,
     name = json.name;
     weather.innerText = `${Math.round(temp)}°C @ ${name}`;
  })
}

function saveLocation(location){
  localStorage.setItem(COORDS, JSON.stringify(location));
}

function geoError(){
 weather.innerText = "Loading weather failed";
}

function geoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationObj = {
    latitude,
    longitude
  }
  saveLocation(locationObj);
  getWeather(latitude, longitude)
}

function askLocation(){
  navigator.geolocation.getCurrentPosition(geoSucces, geoError);
}

function loadLocation(){
  const savedLocation = localStorage.getItem(COORDS);
  if(savedLocation === null){
    askLocation();
    }else{
      const parsedLocation = JSON.parse(savedLocation);
      getWeather(parsedLocation.latitude, parsedLocation.longitude);
    }
  }


function init(){

    const randomNumber = genRandom();
    paintImage(randomNumber);
    date();
    setInterval(date, 1000);
    loadLocation();
}

init();
