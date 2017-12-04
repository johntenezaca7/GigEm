import { combineReducers } from 'redux'; 
import authReducer from './authReducers';
import eventsReducer from './eventsReducers';
import profileReducer from './profileReducers';

export default combineReducers({
    auth: authReducer,
    events: eventsReducer,
    profile: profileReducer,
    info: 'info'
})