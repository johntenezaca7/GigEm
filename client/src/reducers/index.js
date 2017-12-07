import { combineReducers } from 'redux'; 
import authReducer from './authReducers';
import eventsReducer from './eventsReducers';
import eventReducer from './eventReducers';
import attendanceReducer from './attendanceReducer';
// import profileReducer from './profileReducers';
import usersReducer from './usersReducers';
import userInfo from './userInfo';
import profileReducer from './profileReducers';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    events: eventsReducer,
    event: eventReducer,
    // profile: profileReducer,
    users: usersReducer,
    info: userInfo,
    profile: profileReducer,
    form: formReducer
})
