import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from "notiflix";


const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timerEl: document.querySelector('.timer'),
    dayEl: document.querySelector('span[data-days]'),
    hourEl: document.querySelector('span[data-hours]'),
    minuteEl: document.querySelector('span[data-minutes]'),
    secondEl: document.querySelector('span[data-seconds]')
}

refs.startBtn.disabled = true;
refs.startBtn.classList.add('disabled');

let date = null;
const PROMPT_DELAY = 1000;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    
        if (selectedDates[0] < Date.now()) {
            Notify.failure("Please choose a date in the future");
        } else { 
        refs.startBtn.classList.remove('disabled');
        refs.startBtn.disabled = false;
        date = selectedDates[0];
        }
    },
};


class Timer { 
    constructor() { 
      this.isActive = false;
      this.timerId = null;
      refs.startBtn.disabled = true;
    }
  
    start() { 
        if (this.isActive) { 
        return;
        }
        this.isActive = true;
        this.timerId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = date - currentTime;
        const element = convertMs(deltaTime);

        refs.dayEl.textContent = element.days;
        refs.hourEl.textContent = element.hours;
        refs.minuteEl.textContent = element.minutes;
        refs.secondEl.textContent = element.seconds;
        
            if (deltaTime < 0) { 
            this.stop();
            refs.timerEl.innerHTML = 'Promotion ended!';
            }
    }, PROMPT_DELAY);
  
    };
     
    stop() { 
      clearInterval(this.timerId);
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr(refs.inputEl, options);
const timer = new Timer();

refs.startBtn.addEventListener('click', () => timer.start());