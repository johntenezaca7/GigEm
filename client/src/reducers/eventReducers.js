import * as types from '../actions/types';

export default function(state = [], action) {
    // console.log('eventsReducer action: ', action);
    switch(action.type) {
        case types.COMMIT_TO_EVENT:
            return action.payload || false;
        case types.UNCOMMIT_FROM_EVENT:
            return action.payload || false;
        case types.CHECK_ATTENDANCE: // may not use this anymore
            return action.payload || false;
        case types.ADD_EVENT:
            return action.payload || false;
        // case types.ADD_VENUE:
        //     return action.payload || false;
        default:
            return state;
    }
};