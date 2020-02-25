import axios from 'axios';
import { API } from './Config.js';

async function postSignUp(_email, _password, _name) {

    const headers = {
        'Content-Type':'application/json',
    }

    try {
        const result = await axios.post(`${API}/users/`, {
            email: _email,
            password: _password,
            name: _name,
          }, 
            {headers: headers}
        );

        // console.log('postSignUp: \n', result);

        if (result.status) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { postSignUp }