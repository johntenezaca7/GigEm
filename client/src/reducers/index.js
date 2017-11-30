import { combineReducers } from 'redux'; 
import authReducer from './authReducers';
import eventsReducer from './eventsReducers';

export default combineReducers({
    auth: authReducer,
    events: eventsReducer,
    info: 'info'
})