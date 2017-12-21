import * as types from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case types.FETCH_PROPERTIES:
            console.log('fetch properties action.payload: ', action.payload)
            return action.payload || false;
        default:
            return state;
    }
};