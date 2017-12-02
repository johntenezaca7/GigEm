module.exports = (connection, Sequelize) => {
  // //Venues
  return venue = connection.define('Venue', {
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
}