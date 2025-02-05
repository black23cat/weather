import Weather from './weather.js';
import Dom from './dom.js';

export default function event() {
  const weather = Weather();
  const dom = Dom();
  const form = document.querySelector('form');
  const content = document.querySelector('.content');
  form.addEventListener('click', formHandler);
  function formHandler(e) {
    // add form validation to search input to only accept min 3 character length
    // enter button should submit the seach form instead reseting form
    e.preventDefault();
    const searchValue = document.getElementById('search').value;

    if (e.target.id === 'submit' && searchValue !== '') {
      weather.getWeatherData(searchValue).then((result) => {
        const data = result;
        content.append(
          dom.generateMainWeatherInfo(data),
          dom.generateDetailWeatherInfo(data),
          dom.generateHourlyHighlight(data),
          dom.generateWeekForecast(data)
        );
      });
      form.reset();
    }
  }
}
