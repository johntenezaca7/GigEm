import { combineReducers } from 'redux'; 
import authReducer from './authReducers';
import eventsReducer from './eventsReducers';
import eventReducer from './eventReducers';
import attendanceReducer from './attendanceReducer';
import profileReducer from './profileReducers';

export default combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    events: eventsReducer,
    event: eventReducer,
    profile: profileReducer,
    info: 'info'
})