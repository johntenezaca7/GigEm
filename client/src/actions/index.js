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

export const fetchMyEvents = () => async dispatch => {
// console.log('fetching events');
    // eslint-disable-next-line
    const res = await axios.get('/api/myEvents')
    // eslint-disable-next-line
  
    dispatch({ type: types.FETCH_EVENTS, payload: res.data })
}

export const commitToEvent = (user, gig) => async dispatch => {
    console.log('attempting to commit to event: ', user, 'with user id: ', gig);
    const res = await axios.post('/api/commit', {'user': user, 'gig': gig} );
    dispatch({ type: types.COMMIT_TO_EVENT, payload: res.data })
}

export const uncommitFromEvent = (user, gig) => async dispatch => {
    const res = await axios.post('/api/uncommit', {'user': user, 'gig': gig} );
    dispatch({ type: types.UNCOMMIT_FROM_EVENT, payload: res.data })
}

export const checkAttendance = (user, gig) => async dispatch => {
    // console.log(`action checkAttendance: user: ${user}, gig: ${gig}`);
    // console.log('attempting to check attendance form actions');  // adding this fixed something. :/
    const res = await axios.post('/api/commitCheck', {'user': user})
    dispatch({ type: types.CHECK_ATTENDANCE, payload: res.data })

}

export const fetchBandInfo = () => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.post('/bandinfo')
    // eslint-disable-next-line
    dispatch({ type: types.FETCH_BAND_INFO, payload: res.data })
}


export const fetchUserProfile = (googleId) => async dispatch => {
    // eslint-disable-next-line
    const res = await axios.post('/api/profile', {params: googleId})
    // eslint-disable-next-line

    // console.log('DATATBAK', res)
    dispatch({ type: types.FETCH_USER_PROFILE, payload: res.data })
}

export const editUserProfile = (item) => async dispatch => {
    // console.log('editUserProfile task: ', item)
    // console.log('editUserProfile Value: ', value);
    console.log('editUserProfile item: ', item);
    const res = await axios.post(`/api/task/editprofile`, {item});
    // this.forceRender();
    dispatch({ type: types.EDIT_USER_PROFILE, payload: res.data })
}