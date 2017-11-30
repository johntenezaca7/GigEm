import axios from 'axios';
import { FETCH_USER, USER_INFO } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data})
}


