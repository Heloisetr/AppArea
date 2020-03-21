import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native';

async function getNotifications() {
    try {
      const result = await axios({
          method: 'get',
          url: `${API}/notifications`,
          headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: 'Bearer ' + await AsyncStorage.getItem('token')
          }
      });
      if (result.status === 200) {
          return result
      }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { getNotifications }