const mysql = require('mysql2');
const config = require('../config/dbconfig');
const Sequelize = require('sequelize');

const connection = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });  

let forceObj = {force: false};
    
connection
  .authenticate()
  .then(() => {
    console.log('sequelize connection has been established');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

let User = connection.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  isBand: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  phone: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  credits: {
    type: Sequelize.INTEGER,
    defaultValue: 50
  },
});

// // force: true will drop the table if it already exists
User.sync(forceObj).then(() => {
  console.log('SYNC USERS________')
  // Table created
  return User.create({
    googleId: 123456,
    isBand: '1',
    name: 'FunkMonkey',
    description: 'off the vine',
    email: 'monkey123@gmail.com',
    phone: 5129208888,
    age: 22,
    zip: 23456,
    city: "Dallas",
    state: "TX",
    photo: 'pic.jpeg',
    status: 'cool'
  });
});

let Venue = connection.define('Venue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  location: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
});

Venue.sync(forceObj).then(() => {
  console.log('SYNC VENUES-----------------------')
  // Table created
  return Venue.create({
    name: 'Good Room',
    description: 'its alright',
    zip: 23456,
    city: "Brooklyn",
    state: "NY",
    location: 'right here',
  });
});

let Showcase = connection.define('Showcase', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  startDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  startTime: {
    type: Sequelize.TIME,
    defaultValue: null
  },
  endDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  finalCommitDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  isCommitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  minCommits: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  commits: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

Showcase.belongsTo(Venue);
Venue.hasMany(Showcase);
Showcase.belongsTo(User);
User.hasMany(Showcase);

Showcase.sync(forceObj).then(() => {
  console.log('SYNC SHOWCASES-----------------------')
  // Table created
  return Showcase.create({
    name: 'Festivus',
    description: 'for the rest of us',
    zip: 23456,
    city: "Dallas",
    state: "TX",
    photo: 'pic.jpeg',
    minCommits: 10,
    commits: 6
  });
});

Showcase.findAll({ include: [ Venue, User ] }).then(showcases => {
  console.log(JSON.stringify(showcases))
});



// let User = require('../models/Users')(connection, Sequelize);
// let Showcase = require('../models/Showcases')(connection, Sequelize);
// let Venue = require('../models/Venues')(connection, Sequelize);
// let Attendance = require('../models/Attendance')(connection, Sequelize);
// let Properties = require('../models/Properties')(connection, Sequelize);

// Foreign Keys
// Properties.belongsTo(User);
// Attendance.belongsToMany(User);
// Attendance.belongsToMany(Showcase);
// Showcase.belongsToMany(User, {through: 'Attendance'});
// User.belongsToMany(Showcase, {through: 'Attendance'});







// Showcase.hasOne(Venue, { foreignKey: 'venueId' })
// Showcase.hasOne(User, { foreignKey: 'userId' })
// User.hasMany(Properties, { foreignKey: 'userId' })
// Attendance.hasMany(Showcase, { foreignKey: 'eventId' })
// Attendance.hasMany(User, { foreignKey: 'userId' })

//console.log('EVENTTTTTttttttttt', Event);
  // force: true will drop the table if it already exists
// Properties.sync({force: true}).then(() => {
//   console.log('SYNC IN Properties-----------------------')
//   // Table created
//   return Properties.create({
//     // userId: 1,
//     linkUrl: 'www.rockon.com',
//     description: 'rock off'
//   });
// });


//   Attendance.sync({force: true}).then(() => {
//   console.log('SYNC IN Atttendance-----------------------')
//   // Table created
//   return Attendance.create({
//     // eventId: 1,
//     // userId: 1
//   });
// });


// //Venues
// const Venue = connection.define('Venue', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   description: {
//     type: Sequelize.TEXT,
//     defaultValue: ''
//   },
//   zip: {
//     type: Sequelize.INTEGER,
//     defaultValue: null
//   },
//   city: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   state: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   photo: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   },
//   location: {
//     type: Sequelize.STRING,
//     defaultValue: ''
//   }
// });


// const checkUser = function(id, callback){     
//      let sql = `SELECT google_id FROM Users WHERE google_id = "${id}"`;
//      connection.query(sql, (err, data) => {
//          if(err){
//              callback(err, null)
//             } else {
//                 callback(null, data);
//             }
//         });
// }
    
// const newUser = function(profile, callback){
//         let sql = `INSERT INTO Users(google_id, name, email, photo) VALUES("${profile.id}", "${profile.displayName}", "${profile.emails[0].value}", "${profile.photos[0].value}")`;
//         connection.query(sql, (err, data) => {
//             if(err){
//                 callback(err, null);
//             } else {
//                 callback(null, data);
//             }
//         });
// }

// const getUserInfo = function(id, callback){
//     let sql =  `SELECT * FROM Users WHERE google_id = "${id}"`;
//     connection.query(sql, (err, data) => {
//         if(err){
//             callback(err, null)
//         } else {
//             callback(null, data)
//         }
//     })
// }
    
    
// exports.getUserInfo = getUserInfo;
// exports.checkUser = checkUser;
// exports.newUser = newUser;
// exports.connection = connection;
   