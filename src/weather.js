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
    this.rainChance = obj.days[0].precipprob;
    this.humidity = obj.days[0].humidity;
    this.weatherType = obj.days[0].preciptype;
    this.currentCondition = obj.days[0].conditions;
    this.sunrise = obj.days[0].sunrise;
    this.sunset = obj.days[0].sunset;
    this.hourlyForecast = [];
    this.weekForecast = [];
  }
  updateHourlyData(obj) {
    for (let i = 7; i < 19; i++) {
      const hourlyData = {
        temp: obj.days[0].hours[i].temp,
        datetime: obj.days[0].hours[i].datetime,
        condition: obj.days[0].hours[i].conditions,
      };
      this.hourlyForecast.push(hourlyData);
    }
  }

  updateWeekForecast(obj) {
    const daysArr = obj.days;
    console.log(daysArr);
    for (let i = 1; i < daysArr.length; i++) {
      const weekData = {
        currentDay: format(add(todayDate, { days: i }), 'EEEE'),
        date: daysArr[i].datetime,
        temp: daysArr[i].temp,
        condition: daysArr[i].conditions,
      };
      this.weekForecast.push(weekData);
    }
  }
}

export default function Weather() {
  async function getWeatherData(city) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${todayDate}T00:00:00/${weekAfterTodayDate}/?unitGroup=metric&key=WJNQVWFAP9JQ63V8MZ6VUSYGN`,
        { mode: 'cors' }
      );
      const result = await response.json();
      const data = new CityWeather(result);
      data.updateHourlyData(result);
      data.updateWeekForecast(result);
      console.log(data);
      console.log(result);
      return data;
    } catch {
      alert('Enter correct city.');
    }
  }

  return { getWeatherData };
}
