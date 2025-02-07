import { format } from 'date-fns';
import weatherIcon from './weather-icon.js';
import background from './bg-images.js';

export default function Dom() {
  //get icon and bg images object
  const icon = weatherIcon;
  const bgImages = background;
  // Main weather info DOM
  function generateMainWeatherInfo(obj) {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    const weatherHeader = document.createElement('div');
    const city = document.createElement('h3');
    const daysAndDate = document.createElement('h3');
    const weatherConditionWrapper = document.createElement('div');
    const tempWrapper = document.createElement('div');
    const mainWeatherIcon = document.createElement('img');
    const mainTemp = document.createElement('p');
    const mainTempUnit = document.createElement('span');
    const lowHighTemp = document.createElement('p');
    const paraWrapper = document.createElement('div');
    const weatherConditionPara = document.createElement('p');
    const description = document.createElement('p');
    const weatherDetailWrapper = document.createElement('div');
    const tempFeelsLike = document.createElement('p');
    const rainChance = document.createElement('p');
    const rainCover = document.createElement('p');
    const uvIndex = document.createElement('p');
    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');
    //Main weather info attributes and textContent
    body.style.backgroundImage = `url('${bgImages.getBgImage(new Date().getHours())}')`;
    wrapper.setAttribute('class', 'main-weather-info');
    weatherHeader.setAttribute('class', 'weather-header');
    city.textContent = `${obj.address}`;
    daysAndDate.textContent = `${obj.currentDay}, ${format(obj.date, 'PP').slice(0, -6)}`;
    weatherConditionWrapper.setAttribute('class', 'condition-wrapper');
    tempWrapper.setAttribute('class', 'temp-wrapper');
    mainWeatherIcon.src = icon.getIcon(obj.icon);
    mainWeatherIcon.setAttribute('class', 'main-icon');
    mainTemp.textContent = `${obj.temp} \u00B0`;
    mainTemp.setAttribute('class', 'main-temp temp');
    mainTempUnit.textContent = 'C';
    weatherConditionPara.textContent = `${obj.currentCondition}.`;
    lowHighTemp.textContent = `${obj.lowTemp} \u00B0 / ${obj.highTemp} \u00B0 `;
    lowHighTemp.setAttribute('class', 'low-high-temp temp');
    paraWrapper.setAttribute('class', 'detail-para-wrapper');
    weatherDetailWrapper.setAttribute('class', 'weather-detail');
    tempFeelsLike.textContent = `Feelslike ${obj.tempFeelsLike} \u00B0`;
    tempFeelsLike.setAttribute('class', 'temp');
    rainChance.innerHTML = `Rain Chance ${obj.rainChance}%`;
    rainCover.innerHTML = `Rain Cover ${obj.rainCover}%`;
    uvIndex.innerHTML = `UV Index ${obj.uvIndex}`;
    sunrise.textContent = `Sunrise ${obj.sunrise.slice(0, -3)} AM`;
    sunset.textContent = `Sunset ${obj.sunset.slice(0, -3)} PM`;
    description.textContent = `${obj.description}`;

    // appending all element to wrapper and returning the wrapper
    mainTemp.append(mainTempUnit);
    weatherHeader.append(city, daysAndDate);
    tempWrapper.append(mainTemp, lowHighTemp);
    paraWrapper.append(weatherConditionPara, description);
    weatherConditionWrapper.append(mainWeatherIcon, tempWrapper, paraWrapper);
    weatherDetailWrapper.append(
      tempFeelsLike,
      rainChance,
      rainCover,
      uvIndex,
      sunrise,
      sunset
    );
    wrapper.append(
      weatherHeader,
      weatherConditionWrapper,
      weatherDetailWrapper
    );

    return wrapper;
  }

  function generateHourlyHighlight(obj) {
    const hourlyForecastHeader = document.createElement('h1');
    const hourlyDetailWrapper = document.createElement('div');
    hourlyForecastHeader.textContent = 'Hourly Forecast';
    hourlyDetailWrapper.setAttribute('class', 'hourly-forecast-wrapper');
    hourlyDetailWrapper.appendChild(hourlyForecastHeader);

    const hourlyDetail = obj.hourlyForecast;
    hourlyDetail.forEach((hour) => {
      const hourlyCardWrapper = document.createElement('div');
      const temp = document.createElement('p');
      const weatherConditionIcon = document.createElement('img');
      const weatherConditionPara = document.createElement('p');
      const time = document.createElement('p');
      hourlyCardWrapper.setAttribute('class', 'hourly-forecast-card');
      temp.textContent = `${hour.temp}\u00B0`;
      temp.setAttribute('class', 'temp card');
      weatherConditionIcon.src = icon.getIcon(hour.icon);
      weatherConditionPara.textContent = `${hour.description}`;
      time.textContent = `${hour.datetime.slice(0, 5)}`;
      hourlyCardWrapper.append(
        time,
        weatherConditionIcon,
        temp,
        weatherConditionPara
      );
      hourlyDetailWrapper.append(hourlyCardWrapper);
    });
    return hourlyDetailWrapper;
  }

  // initialize funtion to update screen
  function updateScreen(obj, parentNode) {
    parentNode.textContent = '';
    parentNode.append(
      generateMainWeatherInfo(obj),
      generateHourlyHighlight(obj)
    );
  }
  return { updateScreen };
}
