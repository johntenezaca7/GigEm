const dbDef = require('../db/index');

module.exports = (app, db) => {

  const getAllVenues = (callback) => {
    const sql = `SELECT * FROM Venues`;
    return db.connection.query(sql, (err, data) => {
      if (err) console.log('getAllVenue Error: ', err);
      callback(err, data);
    })
  };


  // get all venues works!
  app.get('/api/getAllVenues', (req, res) =>{
    dbDef.Venue.findAll({})
    .then((data) => {
      console.log('found venues: ', console.log(data));
      res.send(data);
    })
  });

  // add venue works with SQL
  app.post('/api/addVenue', (req, res) =>{
    console.log('venue route working')
    console.log("REQ VENUE BODYYYYYY ", req.body);
    dbDef.Venue.create({
      name: req.body.info.venueName,
      description: req.body.description,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      location: req.body.location    
    })
    .then((data) => {
      res.send(data);
    })
  });
}