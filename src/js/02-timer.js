'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
      console.log(selectedDates[0]);
    } else if (selectedDates[0] > new Date()) {
      startBtn.addEventListener('click', () => {
        timerId = setInterval(() => {
          convertMs(5000);
          console.log('helloy');
          // document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
      });
    }
  },
};
flatpickr(inputEl, options);
console.log(convertMs(5000000000));

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
