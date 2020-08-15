const clockContainer = document.querySelector(".js-container"),
  clock = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  clock.innerText = `${hour < 10 ? `0${hour}` : `${hour}`}:${
    min < 10 ? `0${min}` : `${min}`
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
