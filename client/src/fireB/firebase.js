import firebase from 'firebase';
import keys from './fKeys';
// import axios from 'axios';

const config = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  databaseURL: keys.databaseURL,
  storageBucket: keys.storageBucket
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;

