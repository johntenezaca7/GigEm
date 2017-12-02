let sequelize = require('../db/index.js');

const Venue = sequelize.define('Venue', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});
    
  // force: true will drop the table if it already exists
Venue.sync({force: true}).then(() => {
  // Table created
  return Venue.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

exports.Venue = Venue;