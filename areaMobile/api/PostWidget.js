import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native';


async function getWidgets(serviceName) {
    try {
      const result = await axios({
        method: 'get',
        url: `${API}/widgets/${serviceName}`,
        data: {
          name: serviceName,
        },
        headers: {
          Authorization: 'Bearer ' + AsyncStorage.getItem('token')
        }
      });

      // console.log('getWidgets: \n', result);

      if (result.status === 200) {
          return result
      }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { getWidgets }