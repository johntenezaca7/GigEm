import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
<<<<<<< HEAD
    const res= await axios.get('/api/current_user')
 
=======
    const res = await axios.get('/api/current_user')
>>>>>>> 20de9f47
    dispatch({ type: FETCH_USER, payload: res.data})
}

