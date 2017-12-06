import { FETCH_USER_PROFILE } from '../actions/types';

export default function(state = [], action) {
    // console.log('eventsReducer action: ', action);
   
    switch(action.type) {
        case FETCH_USER_PROFILE:
            return action.payload || false;
        default:
            return state;
    }
};
import { FETCH_ALL_USERS } from '../actions/types';


export default function(state = [], action) {
  switch(action.type) {
    case FETCH_ALL_USERS:
      return action.payload || false;
    default:
      return state;
  }
}
