'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerEl = document.querySelector('.timer');
timerEl.style.display = 'flex';
timerEl.style.gap = '15px';
timerEl.style.textAlign = 'center';
timerEl.style.paddingTop = '20px';

const valueEls = document.querySelectorAll('.value');
valueEls.forEach(valueEl => {
  valueEl.style.display = 'block';
  valueEl.style.fontWeight = '700';
  valueEl.style.fontSize = '28px';
});
const labelEls = document.querySelectorAll('.label');
labelEls.forEach(labelEl => {
  labelEl.style.fontSize = '12px';
  labelEl.style.textTransform = 'uppercase';
  labelEl.style.fontWeight = '600';
});

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
let timerId = null;
let selectTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectTime > 0) {
      Notify.failure(`Please reload the page`);
      return;
    } else if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else if (selectedDates[0] > new Date()) {
      startBtn.disabled = false;
      selectTime = selectedDates[0].getTime();
    }
  },
};
flatpickr(inputEl, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectTime - currentTime;
    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    }
    const times = convertMs(deltaTime);
    document.querySelector('span[data-seconds]').textContent = addLeadingZero(
      times.seconds
    );

    document.querySelector('span[data-minutes]').textContent = addLeadingZero(
      times.minutes
    );
    document.querySelector('span[data-hours]').textContent = addLeadingZero(
      times.hours
    );
    document.querySelector('span[data-days]').textContent = addLeadingZero(
      times.days
    );
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
