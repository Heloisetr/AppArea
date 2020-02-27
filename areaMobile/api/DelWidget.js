import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native'


async function deleteWidget(serviceName, widgetName) {
    try {
      const result = await axios({
        method: 'delete',
        url: `${API}/widgets/${serviceName}/${widgetName}`,
        headers: {
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

export { deleteWidget }