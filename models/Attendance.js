module.exports = (connection, Sequelize) => {
  return attendance = connection.define('Attendance', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // eventId: {
    //   type: Sequelize.INTEGER,
    //   defaultValue: null
    // },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   defaultValue: null
    // }
  });
}