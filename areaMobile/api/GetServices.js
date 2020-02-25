import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native'


async function getServices() {

    try {
      const result = await axios.get(`${API}/services/`, {
        headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + AsyncStorage.getItem('token'),
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

export { getServices }