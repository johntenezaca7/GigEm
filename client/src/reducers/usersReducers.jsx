import { FETCH_ALL_USERS } from '../actions/types';

export default function(state = [], action) {
  // console.log('DATA SHOULD BE GOOOD WITH STRING', action.payload)
  
  switch(action.type) {
    case FETCH_ALL_USERS:
    // console.log('DATA SHOULD BE GOOOD',action.payload)
      return action.payload || false;
    default:
      return state;
  }
}
