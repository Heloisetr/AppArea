import axios from 'axios';
import { API } from './Config_old.js/index.js';
import { AsyncStorage } from 'react-native'


async function getCurrentUser() {

    try {
      const result = await axios.get(`${API}/users/`, {
        headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
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

export { getCurrentUser }