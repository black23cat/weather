import Weather from './weather.js';

export default function event() {
  const weather = Weather();
  const form = document.querySelector('form');
  form.addEventListener('click', formHandler);
  function formHandler(e) {
    // add form validation to search input to only accept min 3 character length
    // enter button should submit the seach form instead reseting form
    e.preventDefault();
    const searchValue = document.getElementById('search').value;

    if (e.target.id === 'submit' && searchValue !== '') {
      weather.getWeatherData(searchValue);
      form.reset();
    }
  }
}
