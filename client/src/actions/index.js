import axios from 'axios';
import * as types from './types';


export const fetchUser = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.get('/api/current_user')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_USER, payload: res.data })
}

export const fetchEvents = () => async dispatch => {
    // console.log('fetching events');
    // eslint-disable-next-line
    const res = await axios.get('/api/events')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_EVENTS, payload: res.data })
}

export const fetchVenues = () => async dispatch => {
    console.log('fetching venues');
    // eslint-disable-next-line
    const res = await axios.get('/api/getAllVenues')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_VENUES, payload: res.data })
}

export const fetchMyEvents = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.get('/api/myEvents')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_EVENTS, payload: res.data })
}

export const commitToEvent = (user, gig) => async dispatch => {
    const res = await axios.post('/api/commit', {'user': user, 'gig': gig} );
    dispatch({ type: types.COMMIT_TO_EVENT, payload: res.data })
}

export const uncommitFromEvent = (user, gig) => async dispatch => {
    const res = await axios.post('/api/uncommit', {'user': user, 'gig': gig} );
    dispatch({ type: types.UNCOMMIT_FROM_EVENT, payload: res.data })
}

export const addNewEvent = (event) => async dispatch => {
    console.log('attempting to add showcase event: ', event);
    const res = await axios.post('/api/addEvent', {'info': event} );
        console.log('ADD EVENT ACT: ', res.data)

    dispatch({ type: types.ADD_EVENT, payload: res.data })
}

export const sendNewEventEmail = (event) => async dispatch => {
    console.log('attempting to send new event email: ', event);
    const res = await axios.post('/api/sendEmail', {'info': event} );
        console.log('SENDING EMAIL RES: ', res.data)

    dispatch({ type: types.SEND_NEW_EVENT_EMAIL, payload: res.data })
}

export const addNewVenue = (event) => async dispatch => {
    console.log('attempting to add venue: ', event);
    const res = await axios.post('/api/addVenue', {'info': event} );
    console.log(res);
    dispatch({ type: types.ADD_VENUE, payload: res.data })
}

export const checkAttendance = (user, gig) => async dispatch => {
    const res = await axios.post('/api/commitCheck', {'user': user})
    dispatch({ type: types.CHECK_ATTENDANCE, payload: res.data })
}

export const fetchBandInfo = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.post('/bandinfo')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_BAND_INFO, payload: res.data })
}

export const fetchUserProfile = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.get('/api/profile')
    // console.log('attempting to fetch user profile / action')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_USER_PROFILE, payload: res.data })
}

export const editUserProfile = (item) => async dispatch => {
    // console.log(`editUserProfile item: ${item}`);
    // eslint-disable-next-line
    const res = await axios.post(`/api/task/editprofile`, {item});
    // this.forceRender();
    dispatch({ type: types.EDIT_USER_PROFILE, payload: res.data })
}

export const fetchAllUsers = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.get('/api/all_users')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_ALL_USERS, payload: res.data })
}


