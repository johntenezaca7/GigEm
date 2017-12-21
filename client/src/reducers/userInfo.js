import { FETCH_USER_PROFILE } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USER_PROFILE:
      // console.log('user info got fetch user profile reducer');
      return action.payload || false;
    default: 
      return state;
  }
};