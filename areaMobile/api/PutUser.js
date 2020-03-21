import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native'

async function putUser(new_user) {
    //console.log(new_user);
  try {
    const result = await axios({
      method: 'put',
      url: `${API}/users/`,
      data: {
        params: {
          name: new_user,
        }
      },
      headers: {
        Authorization: 'Bearer ' + await AsyncStorage.getItem('token'),
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

export { putUser }