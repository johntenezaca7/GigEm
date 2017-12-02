module.exports = (connection, Sequelize) => {
  return properties = connection.define('Properties', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   defaultValue: null
    // },
    linkUrl: {
      type: Sequelize.TEXT,
      defaultValue: null
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  });
}