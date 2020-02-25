import axios from 'axios';
import { API } from './Config.js';


async function postLogin(email, password) {

    const headers = {
      'Content-Type':'application/json',
    }

    try {
        const result = await axios.post(`${API}/users/auth`, {
            email: email,
            password: password,
          }, 
          {headers: headers}
        );

        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { postLogin }