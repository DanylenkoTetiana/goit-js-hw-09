' use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
const amountEl = document.querySelector('input[name=amount]');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name= step]');
// console.log(formEl);
// const args = [];
// const numbersArrey = [];
// const delayArrey = [];

formEl.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  let calculatedDelay = Number(delayEl.value) - Number(stepEl.value);
  // let numbers = 1;
  for (let i = 1; i <= amountEl.value; i += 1) {
    // numbersArrey.push(i);

    calculatedDelay += Number(stepEl.value);
    // delayArrey.push(calculatedDelay);

    createPromise(i, calculatedDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    console.log(createPromise(i, calculatedDelay));
    // console.log(numbersArrey);
    // console.log(delayArrey);
  }
}

// console.log(createPromise(1, 3000));

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
