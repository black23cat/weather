import { format } from 'date-fns';
import weatherIcon from './weather-icon.js';
import background from './bg-images.js';

export default function Dom() {
  const icon = weatherIcon;
  const bgImages = background;
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
    mainTemp.setAttribute('class', 'main-temp');
    weatherConditionPara.textContent = `${obj.currentCondition}.`;
    lowHighTemp.textContent = `${obj.highTemp} \u00B0 / ${obj.lowTemp} \u00B0`;
    lowHighTemp.setAttribute('class', 'low-high-temp');
    paraWrapper.setAttribute('class', 'detail-para-wrapper');
    weatherDetailWrapper.setAttribute('class', 'weather-detail');
    tempFeelsLike.textContent = `Feelslike ${obj.tempFeelsLike} \u00B0`;
    rainChance.innerHTML = `Rain Chance ${obj.rainChance}%`;
    rainCover.innerHTML = `Rain Cover ${obj.rainCover}%`;
    uvIndex.innerHTML = `UV Index ${obj.uvIndex}`;
    sunrise.textContent = `Sunrise ${obj.sunrise.slice(0, -3)} AM`;
    sunset.textContent = `Sunset ${obj.sunset.slice(0, -3)} PM`;
    description.textContent = `${obj.description}`;

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
      sunset,
    );
    wrapper.append(
      weatherHeader,
      weatherConditionWrapper,
      weatherDetailWrapper,
    );

    return wrapper;
  }

  // function generateHourlyHighlight(obj) {
  //   const hourlyDetailWrapper = document.createElement('div');
  //   const hourlyDetail = obj.hourlyForecast;
  //   hourlyDetail.forEach((hour) => {
  //     const hourlyCardWrapper = document.createElement('div');
  //     const temp = document.createElement('p');
  //     const weatherConditionIcon = document.createElement('img');
  //     const weatherConditionPara = document.createElement('p');
  //     const time = document.createElement('p');
  //     temp.innerHTML = `<span>${hour.temp}</span><span>C</span>`;
  //     weatherConditionIcon.src = icon.getIcon(hour.icon);
  //     weatherConditionPara.textContent = `${hour.condition}`;
  //     time.textContent = `${hour.datetime.slice(0, 2)} AM/PM`;
  //     hourlyCardWrapper.append(
  //       time,
  //       weatherConditionIcon,
  //       temp,
  //       weatherConditionPara,
  //     );
  //     hourlyDetailWrapper.append(hourlyCardWrapper);
  //   });
  //   return hourlyDetailWrapper;
  // }

  // function generateWeekForecast(obj) {
  //   const dailyData = obj.weekForecast;
  //   const weekForecastWrapper = document.createElement('div');
  //   dailyData.forEach((day) => {
  //     const dailyForecastWrapper = document.createElement('div');
  //     const currentDay = document.createElement('p');
  //     const temp = document.createElement('p');
  //     const weatherConditionIcon = document.createElement('img');
  //     const description = document.createElement('p');
  //     currentDay.textContent = day.currentDay;
  //     temp.innerHTML = `${day.temp} <span>C</span>`;
  //     weatherConditionIcon.src = icon.getIcon(day.icon);
  //     description.textContent = day.description;

  //     dailyForecastWrapper.append(
  //       currentDay,
  //       temp,
  //       weatherConditionIcon,
  //       description,
  //     );
  //     weekForecastWrapper.append(dailyForecastWrapper);
  //   });
  //   return weekForecastWrapper;
  // }

  function updateScreen(obj, parentNode) {
    parentNode.textContent = '';
    parentNode.append(generateMainWeatherInfo(obj));
  }
  return { updateScreen };
}
