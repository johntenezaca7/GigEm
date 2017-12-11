const keys = require('./keys')

module.exports = {
  host     : keys.dbHost,
  port      :  '3306',
  user     : keys.dbUsername,
  password : keys.dbPassword,
  database : 'ussvengeance_dev',
  firebase: {
    apiKey: keys.firebase.apiKey,
    authDomain: keys.firebase.authDomain,
    databaseURL: keys.firebase.authDomain,
    projectId: "gigem-185b4",
    storageBucket: keys.firebase.storageBucket,
    messagingSenderId: keys.firebase.messagingSenderId
  }
}