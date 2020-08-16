const greetForm = document.querySelector(".js-greetForm"),
  greetInput = greetForm.querySelector("input"),
  greeting = document.querySelector(".js-greeting");
  greetDiv = document.querySelector(".js-greetDiv");

const SHOWING_CN = "showing";

function askName(){
  greetForm.classList.add(SHOWING_CN);
  greeting.classList.remove(SHOWING_CN);
  greetForm.addEventListener("submit", handleSubmit);
}

function saveName(user){
  localStorage.setItem("currentUser", user);
}

function handleSubmit(event){
  event.preventDefault();
  const userName = greetInput.value;
  paintGreeting(userName);
  saveName(userName);
}

function paintGreeting(name){
  greeting.innerText = `Welcome ${name}🦾`;
  greetForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
}

function checkForUser (){
  currentUser = localStorage.getItem("currentUser");
  if (currentUser === null){
    askName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  checkForUser();

}

init();
