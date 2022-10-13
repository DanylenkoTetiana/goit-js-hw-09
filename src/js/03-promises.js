' use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
const amountEl = document.querySelector('input[name=amount]');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name= step]');

formEl.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  let calculatedDelay = Number(delayEl.value) - Number(stepEl.value);
  for (let i = 1; i <= amountEl.value; i += 1) {
    calculatedDelay += Number(stepEl.value);
    createPromise(i, calculatedDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

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

// formEl.addEventListener('submit', handleSubmit);
// function handleSubmit(event) {
//   event.preventDefault();
//   let calculatedDelay = Number(delayEl.value) - Number(stepEl.value);
//   for (let i = 1; i <= amountEl.value; i += 1) {
//     calculatedDelay += Number(stepEl.value);
//     args.push({ i, calculatedDelay });
//   }

//   const promises = args.map(arg => {
//     const { i, calculatedDelay } = arg;
//     console.log(createPromise(i, calculatedDelay));
//     return createPromise(i, calculatedDelay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   });
// }

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;

//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }
