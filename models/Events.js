module.exports = (connection, Sequelize) => {
  
  return event = connection.define('Event', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    venueId: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    userId: {
      type: Sequelize.INTEGER,
      defaultValue: null
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

  // force: true will drop the table if it already exists
Event.sync({force: true}).then(() => {
  console.log('SYNC IN EVENTS-----------------------')
  // Table created
  return Event.create({
    venueId: 123456,
    userId: '1',
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



};

