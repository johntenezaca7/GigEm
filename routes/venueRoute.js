const dbDef = require('../db/index');
const Sequelize = require('sequelize');


module.exports = (app, db) => {

  // const getAllVenues = (callback) => {
  //   const sql = `SELECT * FROM Venues`;
  //   return db.connection.query(sql, (err, data) => {
  //     if (err) console.log('getAllVenue Error: ', err);
  //     callback(err, data);
  //   })
  // };


  // get all venues works!
  app.get('/api/getAllVenues', (req, res) =>{
    dbDef.Venue.findAll({})
    // dbDef.Venue.aggregate('name', 'DISTINCT', { plain: false })
    // attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']]
    .then((data) => {
      // console.log('found venues: ', console.log(data));
      res.send(data);
    })
  });

  // add venue works with SQL
  app.post('/api/addVenue', (req, res) =>{
    console.log('venue route working')
    console.log("REQ VENUE BODYYYYYY ", req.body);
    dbDef.Venue.create({
      name: req.body.info.venueName,
      description: req.body.info.venueDescription,
      address: req.body.info.address,
      city: req.body.info.city,
      state: req.body.info.state,
      zip: req.body.info.zip,
      location: req.body.info.location    
    })
    .then((data) => {
      res.send(data);
    })
  });
}