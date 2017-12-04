import axios from 'axios';
import { FETCH_USER /*, USER_INFO */ } from './types';
import { FETCH_EVENTS } from './types';
import { FETCH_BAND_INFO } from './types';
import { FETCH_USER_PROFILE } from './types';
import { EDIT_USER_PROFILE } from './types';

// import { /* RIEToggle,*/ RIEInput /*, RIETextArea, RIENumber, RIETags, RIESelect */} from 'riek'
// import _ from 'lodash'

export const fetchUser = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.get('/api/current_user')
    // eslint-disable-next-line
    dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchEvents = () => async dispatch => {
    // console.log('fetching events');
    // eslint-disable-next-line
    const res = await axios.get('/api/events')
    // eslint-disable-next-line
    dispatch({ type: FETCH_EVENTS, payload: res.data })
}

export const fetchBandInfo = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.post('/bandinfo')
    // eslint-disable-next-line
    dispatch({ type: FETCH_BAND_INFO, payload: res.data })
}


export const fetchUserProfile = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.get('/api/profile')
    // eslint-disable-next-line
    dispatch({ type: FETCH_USER_PROFILE, payload: res.data })
}

export const editUserProfile = (item) => async dispatch => {
    // console.log('editUserProfile task: ', item)
    // console.log('editUserProfile Value: ', value);
    console.log('editUserProfile item: ', item);
    const res = await axios.post(`/api/task/editprofile`, {item});
    // this.forceRender();
    dispatch({ type: EDIT_USER_PROFILE, payload: res.data })
}