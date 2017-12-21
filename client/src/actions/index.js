import axios from 'axios';
import * as types from './types';


export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: types.FETCH_USER, payload: res.data })
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: types.FETCH_USER, payload: res.data })
}

export const fetchEvents = () => async dispatch => {
  const res = await axios.get('/api/events')
  dispatch({ type: types.FETCH_EVENTS, payload: res.data })
}

export const fetchVenues = () => async dispatch => {   
  const res = await axios.get('/api/getAllVenues')
  dispatch({ type: types.FETCH_VENUES, payload: res.data })
}

export const fetchMyEvents = () => async dispatch => {
  const res = await axios.get('/api/myEvents')
  dispatch({ type: types.FETCH_EVENTS, payload: res.data })
}

export const commitToEvent = (user, gig, amount) => async dispatch => {
  const res = await axios.post('/api/commit', {'user': user, 'gig': gig, 'amount' : amount} );
  dispatch({ type: types.COMMIT_TO_EVENT, payload: res.data })
}

export const uncommitFromEvent = (user, gig, amount) => async dispatch => {
  const res = await axios.post('/api/uncommit', {'user': user, 'gig': gig, 'amount': amount} );
  dispatch({ type: types.UNCOMMIT_FROM_EVENT, payload: res.data })
}

export const addNewEvent = (event) => async dispatch => {
  const res = await axios.post('/api/addEvent', {'info': event} );
  dispatch({ type: types.ADD_EVENT, payload: res.data })
}

export const payForEvent = (user, event) => async dispatch => {
  const res = await axios.post('/api/payForEvent', {'user': user.id, 'gig': event.id} );
  dispatch({ type: types.PAY_FOR_EVENT, payload: res.data })
}

export const sendNewEventEmail = (event) => async dispatch => {
  const res = await axios.post('/api/sendEmail', {'info': event} );
  dispatch({ type: types.SEND_NEW_EVENT_EMAIL, payload: res.data })
}

export const sendNewEventText = (event) => async dispatch => {
  const res = await axios.post('/api/sendText', {'info': event} );
  dispatch({ type: types.SEND_NEW_EVENT_TEXT, payload: res.data })
}

export const addNewVenue = (event) => async dispatch => {
  const res = await axios.post('/api/addVenue', {'info': event} );
  dispatch({ type: types.ADD_VENUE, payload: res.data })
}

export const checkAttendance = (user, gig) => async dispatch => {
  const res = await axios.post('/api/commitCheck', {'user': user})
  dispatch({ type: types.CHECK_ATTENDANCE, payload: res.data })
}

export const fetchBandInfo = () => async dispatch => {
  const res = await axios.post('/bandinfo')
  dispatch({ type: types.FETCH_BAND_INFO, payload: res.data })
}

export const fetchUserProfile = () => async dispatch => {
  const res = await axios.get('/api/profile')
  dispatch({ type: types.FETCH_USER_PROFILE, payload: res.data })
}

export const editUserProfile = (item) => async dispatch => {
  const res = await axios.post(`/api/task/editprofile`, {item});
  dispatch({ type: types.EDIT_USER_PROFILE, payload: res.data })
}

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get('/api/all_users')    
  dispatch({ type: types.FETCH_ALL_USERS, payload: res.data.map((obj) => Object.assign({}, obj)) })
}

export const savePhoto = (imageURL) => async dispatch =>{
  const res = await axios.post('/api/save_photo', {img: imageURL});
  dispatch({ type: types.SAVE_PHOTO, payload: res.data})
}

export const saveEventPhoto = (infos) => async dispatch =>{
  const res = await axios.post('/api/save_event_photo', infos);
  dispatch({ type: types.SAVE_EVENT_PHOTO, payload: res.data})
}

export const fetchProperties = () => async dispatch =>{
  const res = await axios.get('/api/properties');
  dispatch({ type: types.FETCH_PROPERTIES, payload: res.data})
}

export const addProperty = (bandId, description, linkUrl) => async dispatch => {
  const res = await axios.post('/api/add_property', {userid: bandId, linkurl: linkUrl, description: description});
  dispatch({ type: types.ADD_PROPERTY, payload: res.data});
}

export const removeProperty = (mediaItemId) => async dispatch =>{
  const res = await axios.post('/api/remove_property', {itemid: mediaItemId});
  dispatch({ type: types.REMOVE_PROPERTY, payload: res.data});
}

