import { combineReducers } from 'redux'; 
import authReducer from './authReducers';
import eventsReducer from './eventsReducers';
import eventReducer from './eventReducers';
import attendanceReducer from './attendanceReducer';
// import profileReducer from './profileReducers';
import usersReducer from './usersReducers';
import venueReducer from './venueReducers';
import userInfo from './userInfo';
import profileReducer from './profileReducers';
import {reducer as formReducer} from 'redux-form';
// import Message from './boardMesRed';

import User from './addChatUser';

export default combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    events: eventsReducer,
    event: eventReducer,
    // profile: profileReducer,
    users: usersReducer,
    venues: venueReducer,
    info: userInfo,
    profile: profileReducer,
    // info: userInfo,
    form: formReducer,
    chat: User
    // message: Message
})
