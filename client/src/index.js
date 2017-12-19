import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import App from './App';
import reducers from './reducers';

// let socket = io('http://10.16.1.214:3050');
// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// store.subscribe(()=>{
//   console.log('new client state from App', store.getState());
// });

// store.dispatch({type:'server/hello', data:'Hello!'});

ReactDOM.render(
  <Provider store={store}>
      <App />
 </Provider>
  , document.getElementById('root')
);

