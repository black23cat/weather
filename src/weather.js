import { lightFormat, add, format } from 'date-fns';

const todayDate = lightFormat(new Date(), 'yyyy-MM-dd');
const currentDay = format(todayDate, 'EEEE');
const weekAfterTodayDate = lightFormat(
  add(todayDate, { days: 7 }),
  'yyyy-MM-dd'
);

class CityWeather {
  constructor(obj) {
    this.address = obj.resolvedAddress;
    this.currentDay = currentDay;
    this.date = obj.days[0].datetime;
    this.description = obj.days[0].description;
    this.temp = obj.days[0].temp;
    this.tempFeelsLike = obj.days[0].feelslike;
    this.lowTemp = obj.days[0].feelslikemin;
    this.highTemp = obj.days[0].feelslikemax;
    this.uvIndex = obj.days[0].uvindex;
    this.rainChance = obj.days[0].precipprob;
    this.rainCover = obj.days[0].precipcover;
    this.weatherType = obj.days[0].preciptype;
    this.currentCondition = obj.days[0].conditions;
    this.sunrise = obj.days[0].sunrise;
    this.sunset = obj.days[0].sunset;
    this.icon = obj.days[0].icon;
    this.hourlyForecast = [];
    this.weekForecast = [];
  }

  updateHourlyData(obj) {
    for (let i = 0; i < 24; i++) {
      if (i % 2 === 1) {
        const hourlyData = {
          temp: obj.days[0].hours[i].temp,
          datetime: obj.days[0].hours[i].datetime,
          description: obj.days[0].hours[i].conditions,
          icon: obj.days[0].hours[i].icon,
        };
        this.hourlyForecast.push(hourlyData);
      }
    }
  }

  updateWeekForecast(obj) {
    const daysArr = obj.days;
    console.log(daysArr);
    for (let i = 1; i < daysArr.length; i++) {
      const weekData = {
        currentDay: format(add(todayDate, { days: i }), 'EEEE'),
        temp: daysArr[i].temp,
        description: daysArr[i].description,
        icon: daysArr[i].icon,
      };
      this.weekForecast.push(weekData);
    }
  }
}

// Get weather data from Visual Crossing API
export default async function getWeatherData(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${todayDate}T00:00:00/?unitGroup=metric&key=WJNQVWFAP9JQ63V8MZ6VUSYGN`,
    { mode: 'cors' }
  );
  // Process data fetched from API to an City object
  // Return City Object with required data to display on page
  const result = await response.json();
  const data = new CityWeather(result);
  data.updateHourlyData(result);
  console.log(result);
  console.log(data);
  return data;
}
