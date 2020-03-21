import axios from 'axios';
import { VANT_KEY, VANT } from './Config.js';

async function getStock(name) {
    try {
      const result = await axios({
        method: 'get',
        url: `${VANT}/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=${VANT_KEY}`,
      });

      // console.log('getStocks: \n', result);

      if (result.status === 200) {
          return result
      }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { getStock }