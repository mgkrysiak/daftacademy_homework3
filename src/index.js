// Import stylesheets
import './styles/style.css';
import "@babel/polyfill";

const getEl = (id) => document.getElementById(id);
const setEl = (id, value) => getEl(id).innerHTML = value;

const setClock = (seconds, minutes, hours) => {
  seconds = seconds.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');

  setEl('hr', hours);
  setEl('min', minutes);
  setEl('sec', seconds)
}


function* timeGen(secondsInMinutes, minutesInHour, hoursInDay) {
  let [second, minute, hour] = [0, 0, 0];

  for(let h = 0; h < hoursInDay; h = h + 1) {
    for(let m = 0; m < minutesInHour; m = m + 1) {
      for(let s = 0; s < secondsInMinutes; s = s + 1) {
        second = second + 1;
        yield [second, minute, hour];
      }
      second = 0;
      minute += 1;
    }
    minute = 0;
    hour += 1;
  }
}

const init = () => {
  let generator = timeGen(60, 60, 12);
  setClock(0, 0, 0);

  const timerId = setInterval(() => {
    console.log('.');
    const generated = generator.next();
    if (generated.done) {
      console.log('done 🙏');
      clearInterval(timerId);
    } else {
      console.log(generated.value);
      setClock(...generated.value);
    }
  }, 1000);
};
init();
