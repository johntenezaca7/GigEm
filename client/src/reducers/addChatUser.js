import { SERVER_HELLO, MESSAGE  } from '../actions/types'

export default function(state = [], action) {
    // console.log('SOCKEY', action)


    switch(action.type){
    case 'send message':
      return action.data;
    case 'message' :         
      return action.data;
    default:
      return state;
  }
};
