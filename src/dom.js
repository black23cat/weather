import { format } from 'date-fns';
import weatherIcon from './weather-icon.js';

export default function Dom() {
  const icon = weatherIcon;
  function generateMainWeatherInfo(obj) {
    const wrapper = document.createElement('div');
    const city = document.createElement('h3');
    const daysAndDate = document.createElement('h3');
    const tempWrapper = document.createElement('div');
    const weatherConditionPara = document.createElement('p');
    const lowHighTemp = document.createElement('p');
    const tempFeelsLike = document.createElement('div');
    const rainChance = document.createElement('p');
    const rainCover = document.createElement('p');
    const uvIndex = document.createElement('p');

    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');
    const description = document.createElement('p');

    city.textContent = `${obj.address}`;
    daysAndDate.textContent = `${obj.currentDay}, ${format(obj.date, 'PP').slice(0, -6)}`;
    tempWrapper.innerHTML = `<span class="temperature">${obj.temp}</span><span class = "temperature-unit">C</span>`;
    weatherConditionPara.textContent = `${obj.currentCondition}`;
    lowHighTemp.innerHTML = `<span>${obj.highTemp}</span>/<span>${obj.lowTemp}<span>C</span>`;
    tempFeelsLike.innerHTML = `Feelslike<span>${obj.tempFeelsLike}</span><span>C</span>`;
    rainChance.innerHTML = `Rain Chance ${obj.rainChance}%`;
    rainCover.innerHTML = `Rain Cover ${obj.rainCover}%`;
    uvIndex.innerHTML = `UV Index ${obj.uvIndex}`;
    sunrise.textContent = `Sunrise ${obj.sunrise.slice(0, -3)} AM`;
    sunset.textContent = `Sunset ${obj.sunset.slice(0, -3)} PM`;
    description.textContent = `${obj.description}`;

    tempWrapper.append(lowHighTemp);
    wrapper.append(
      city,
      daysAndDate,
      tempWrapper,
      weatherConditionPara,
      tempFeelsLike,
      rainChance,
      rainCover,
      uvIndex,
      sunrise,
      sunset,
      description
    );

    return wrapper;
  }

  function generateHourlyHighlight(obj) {
    const hourlyDetailWrapper = document.createElement('div');
    const hourlyDetail = obj.hourlyForecast;
    hourlyDetail.forEach((hour) => {
      const hourlyCardWrapper = document.createElement('div');
      const temp = document.createElement('p');
      const weatherConditionIcon = document.createElement('img');
      const weatherConditionPara = document.createElement('p');
      const time = document.createElement('p');
      temp.innerHTML = `<span>${hour.temp}</span><span>C</span>`;
      weatherConditionIcon.src = icon.getIcon(hour.icon);
      weatherConditionPara.textContent = `${hour.condition}`;
      time.textContent = `${hour.datetime.slice(0, 2)} AM/PM`;
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

  function generateWeekForecast(obj) {
    const dailyData = obj.weekForecast;
    const weekForecastWrapper = document.createElement('div');
    dailyData.forEach((day) => {
      const dailyForecastWrapper = document.createElement('div');
      const currentDay = document.createElement('p');
      const temp = document.createElement('p');
      const weatherConditionIcon = document.createElement('img');
      const description = document.createElement('p');
      currentDay.textContent = day.currentDay;
      temp.innerHTML = `${day.temp} <span>C</span>`;
      weatherConditionIcon.src = icon.getIcon(day.icon);
      description.textContent = day.description;

      dailyForecastWrapper.append(
        currentDay,
        temp,
        weatherConditionIcon,
        description
      );
      weekForecastWrapper.append(dailyForecastWrapper);
    });
    return weekForecastWrapper;
  }

  function updateScreen(obj, parentNode) {
    parentNode.textContent = '';
    parentNode.append(generateMainWeatherInfo(obj));
  }
  return { updateScreen };
}
