const mysql = require('mysql2');
const config = require('../config/dbconfig');
const Sequelize = require('sequelize');
const keys = require('../config/keys')
var firebase = require("firebase");

var fireConfig = config.firebase;
firebase.initializeApp(fireConfig);

var fireDatabase = firebase.database();

fireDatabase.ref().set({
  username: "Jim",
  email: 'email'
});



const connection = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: false,
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
    type: Sequelize.STRING,
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
    type: Sequelize.STRING,
    defaultValue: ''
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

// User.sync({forceObj}).then(() => {
//   console.log('SYNC USERS-----------------------')
//   // Table created
//   return User.create({
//     isBand: '1',
//     name: 'Steve The Guitar',
//     description: 'part man, mostly guitar',
//     email: 'steve@guitar.com',
//     zip: 23456,
//     city: "Brooklyn",
//     state: "NY"
//   });
// });


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
  photo: {
    type: Sequelize.STRING,
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
  address: {
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

// Venue.sync({forceObj}).then(() => {
//   console.log('SYNC VENUES-----------------------')
//   // Table created
//   return Venue.create({
//     name: 'Good Room',
//     description: 'its alright',
//     zip: 23456,
//     city: "Brooklyn",
//     state: "NY",
//     location: 'right here'
//   });
// });

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
  address: {
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
    defaultValue: 1
  },
  commits: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  minCommitValue: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  currentCommitValue: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
});

Showcase.belongsTo(Venue);
Showcase.belongsTo(User);

// Showcase.sync(forceObj).then(() => {
//   console.log('SYNC SHOWCASES-----------------------')
//   // Table created
//   return
//    Showcase.create({
//     name: 'Festivus',
//     description: 'for the rest of us',
//     zip: 23456,
//     city: "Dallas",
//     state: "TX",
//     isCommitted: false,
//     minCommits: 10,
//     commits: 11
//   });
// });

let Properties = connection.define('Properties', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  linkUrl: {
    type: Sequelize.TEXT,
    defaultValue: null
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: null
  }
});

Properties.belongsTo(User);

// Properties.sync(forceObj).then(() => {
//   console.log('SYNC PROPERTIES-----------------------')
//   // Table created
//   return Properties.create({
//     UserId: '1',
//     linkUrl: 'bandsite.com',
//     description: 'woah what a great link'
//   });
// });


let Attendance = connection.define('Attendance', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commitValue: {
    type: Sequelize.FLOAT,
    default: 0
  },
  invoiced: {
    type: Sequelize.BOOLEAN,
    default: 0
  },
  paid: {
    type: Sequelize.BOOLEAN,
    default: 0
  }
});


Attendance.belongsTo(User);
Attendance.belongsTo(Showcase);

Attendance.sync(forceObj).then(() => {
  console.log('SYNC IN Atttendance-----------------------')
  // Table created
  return Attendance.create({
    // UserId: '1',
    // ShowcaseId: '1'
  });
});

exports.User = User;
exports.Venue = Venue;
exports.Showcase = Showcase;
exports.Properties = Properties;
exports.Attendance = Attendance;
exports.connection = connection;
   