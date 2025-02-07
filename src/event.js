import getWeatherData from './weather.js';
import Dom from './dom.js';

export default function event() {
  const getWeather = getWeatherData;
  const dom = Dom();
  const form = document.querySelector('form');
  const search = document.getElementById('search');
  const content = document.querySelector('.content');
  form.addEventListener('click', formHandler);

  function formHandler(e) {
    // add form validation to search input to only accept min 3 character length
    // enter button should submit the seach form instead reseting form
    e.preventDefault();

    if (search.value !== '') {
      toggleLoadingAnimation('start');
      getWeather(search.value)
        .then((result) => {
          const data = result;
          dom.updateScreen(data, content);
          toggleLoadingAnimation('stop');
        })
        .catch(() => {
          alert('Ooopss');
          toggleLoadingAnimation('stop');
        });
      form.reset();
    }
  }

  function toggleLoadingAnimation(status) {
    const spinner = document.querySelector('span div.spinner');
    if (status === 'start') {
      spinner.className = 'spinner active';
    } else {
      spinner.className = 'spinner';
    }
  }

  getWeather('Jakarta').then((result) => {
    const data = result;
    dom.updateScreen(data, content);
  });
}
