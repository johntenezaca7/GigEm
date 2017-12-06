import { FETCH_USER } from '../actions/types';


export default function(state = 7, action) {
    // console.log('authReducer action: ', action);
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state
    }
};