module.exports = (connection, Sequelize) => {
  
  return user = connection.define('User', {
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


// console.log('USERS-----------------------')

// // force: true will drop the table if it already exists
// this.sync({force: true}).then(() => {
//   console.log('SYNC IN USERS-----------------------')
//   // Table created
//   return User.create({
//     googleId: 123456,
//     isBand: '1',
//     name: 'FunkMonkey',
//     description: 'off the vine',
//     email: 'monkey123@gmail.com',
//     age: 22,
//     zip: 23456,
//     city: "Dallas",
//     state: "TX",
//     photo: 'pic.jpeg',
//     status: 'cool'
//   });
// });

}
// User.findAll().then(users => {
//   console.log(users)
// })


