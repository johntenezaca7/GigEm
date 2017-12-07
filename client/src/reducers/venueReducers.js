import * as types from '../actions/types';

export default function(state = [], action) {
    // console.log('eventsReducer action: ', action);
    switch(action.type) {
        case types.ADD_VENUE:
            return action.payload || false;
        case types.FETCH_VENUES:
            return action.payload || false;
        default:
            return state;
    }
};