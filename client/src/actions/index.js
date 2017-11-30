import axios from 'axios';
import { FETCH_USER, USER_INFO } from './types';
import { FETCH_EVENTS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data})
}

export const fetchEvents = () => async dispatch => {
    const res = await axios.get('/events')
    dispatch({ type: FETCH_EVENTS, payload: res.data})
}

