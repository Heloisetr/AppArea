import axios from 'axios';
import { API } from './Config.js';
import { AsyncStorage } from 'react-native'

async function postWidget(service, widget, desc) {

  let description = '';

  if (desc !== undefined) {
    description = desc;
  }
  
  try {
    const result = await axios({
      method: 'post',
      url: `${API}/widgets/${service}/${widget.toLowerCase()}`,
      data: {
        params: {
          description: description
        }
      },
      headers: {
        Authorization: 'Bearer ' + await AsyncStorage.getItem('token')
      }
    });

      // console.log('[postWidget] \n', result);

    if (result.status === 200) {
        return result
    }
  } catch (error) {
      console.log(error);
  }
  return undefined;
}

export { postWidget }