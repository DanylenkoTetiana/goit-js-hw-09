'use strict';
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
let statusTimerId = false;

startBtn.addEventListener('click', () => {
  if (statusTimerId) {
    return;
  }
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    statusTimerId = true;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  statusTimerId = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
