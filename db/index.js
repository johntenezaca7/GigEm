const mysql = require('mysql');
const config = require('../config/dbconfig');

 const connection = mysql.createConnection(config);

 connection.connect((err) => {
     if(err){
         console.log(err);
     } else {
         console.log('Connected to AWS MySQL!')
     }
 })

 exports.connection = connection;