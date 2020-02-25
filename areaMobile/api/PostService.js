import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native';


async function postService(service) {
    try {
      const result = await axios({
        method: 'post',
        url: `${API}/services/${service}`,
        data: {
          name: service,
        },
        headers: {
          Authorization: 'Bearer ' + AsyncStorage.getItem('token')
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

export { postService }