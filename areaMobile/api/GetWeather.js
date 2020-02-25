import axios from 'axios';
import { WEATHER, WEATHER_KEY } from './Config.js';


async function getWeather(city) {
    try {
      const result = await axios({
        method: 'get',
        url: `${WEATHER}/weather?q=${city}&appid=${WEATHER_KEY}`,
     });

      if (result.status === 200) {
          return result
      }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { getWeather }