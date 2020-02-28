import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage, Platform } from 'react-native';


async function getWidgets(serviceName) {
    try {
      const result = await axios({
        method: 'get',
        url: `${API}/widgets/${serviceName}`,
        headers: {
          Authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      });
      if (result.status === 200) {
          return result
      }
    } catch (error) {
        console.log("TEST");
    }
    return undefined;
}

export { getWidgets }