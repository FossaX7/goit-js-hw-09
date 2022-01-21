import { Notify } from "notiflix";

const form = document.querySelector('.form');

form.addEventListener('submit',onFormSubmit)

function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = Number(evt.currentTarget.delay.value);
  let step = Number(evt.currentTarget.step.value);
  let amount = Number(evt.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay)
      })
      .catch(({ position, delay }) => {
        setTimeout(() => { 
           Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay)
      });
    delay += step;
  }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
 
    const valueProm = {position, delay};
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve(valueProm)
      } else {
        reject(valueProm)
      }
    })
}