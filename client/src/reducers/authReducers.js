import { FETCH_USER } from '../actions/types';

<<<<<<< HEAD
export default function(state = null, action) {
   
=======
export default function(state = 7, action) {
    console.log('authReducer action: ', action);
>>>>>>> 20de9f47
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
};