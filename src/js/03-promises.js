' use strict';
const buttonEl = document.querySelector('button');
const amountEl = document.querySelector('input[name=amount]');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name= step]');
console.log(formEl);
console.log(delayEl.value);

const handleSubmit = () => {
  console.log(`Helloy`);
  for (let i = 1; i <= amountEl.value; i += 1) {
    console.log(i);
    console.log(amountEl.value);

    const calculatedDelay = delayEl.value + stepEl.value;
    console.log(delayEl.value);
    console.log(stepEl.value);
    console.log(calculatedDelay);
    createPromise(i, calculatedDelay);
  }
};
buttonEl.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(`helloy`);
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
