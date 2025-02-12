import getWeatherData from './weather.js';
import Dom from './dom.js';

export default function event() {
  const getWeather = getWeatherData;
  const dom = Dom();
  const form = document.querySelector('form');
  const content = document.querySelector('.content');
  form.addEventListener('submit', formHandler);

  function formHandler(e) {
    // add form validation to search input to only accept min 1 character length
    // enter button should submit the seach form instead reseting form

    const searchValue = document.getElementById('search').value;

    if (searchValue !== '') {
      toggleLoadingAnimation('start');
      getWeather(searchValue)
        .then((result) => {
          const data = result;
          dom.updateScreen(data, content);
          toggleLoadingAnimation('stop');
        })
        .catch(() => {
          alert(`Ooopss "${searchValue}" not found`);
          toggleLoadingAnimation('stop');
        });
    } else {
      alert('Enter a City first!');
    }
    form.reset();
    e.preventDefault();
  }

  function toggleLoadingAnimation(status) {
    const spinner = document.querySelector('span div.spinner');
    if (status === 'start') {
      spinner.className = 'spinner active';
    } else {
      spinner.className = 'spinner';
    }
  }

  //Initial load weather data
  getWeather('Jakarta').then((result) => {
    const data = result;
    dom.updateScreen(data, content);
  });
}
