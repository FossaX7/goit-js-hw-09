
const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
};
const PROMPT_DELAY =1000;

let timerId = null;

refs.start.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, PROMPT_DELAY);
    refs.start.setAttribute('disabled', 'true');
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  refs.stop.addEventListener('click', () => {
      clearInterval(timerId);
      refs.start.removeAttribute('disabled');
  });
