const mysql = require('mysql');
const config = require('../config/dbconfig');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//  const connection = mysql.createConnection(config);

//  connection.connect((err) => {
//      if(err){
//          console.log(err);
//      } else {
//          console.log('Connected to AWS MySQL!')
//      }
//  })

const checkUser = function(id, callback){     
     let sql = `SELECT google_id FROM Users WHERE google_id = "${id}"`;
     connection.query(sql, (err, data) => {
         if(err){
             callback(err, null)
            } else {
                callback(null, data);
            }
        });
}
    
const newUser = function(profile, callback){
        let sql = `INSERT INTO Users(google_id, name, email, photo) VALUES("${profile.id}", "${profile.displayName}", "${profile.emails[0].value}", "${profile.photos[0].value}")`;
        connection.query(sql, (err, data) => {
            if(err){
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
}

const getUserInfo = function(id, callback){
    let sql =  `SELECT * FROM Users WHERE google_id = "${id}"`;
    connection.query(sql, (err, data) => {
        if(err){
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
}
    
    
    
    exports.checkUser = checkUser;
    exports.newUser = newUser;
    exports.connection = connection;
    exports.getUserInfo = getUserInfo;