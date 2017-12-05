module.exports = (app, db) => {

  const getAllVenues = (callback) => {
    const sql = `SELECT * FROM Venues`;
    return db.connection.query(sql, (err, data) => {
      if (err) console.log('getAllVenue Error: ', err);
      callback(err, data);
    })
  };

  const addVenue = (req, callback) => {
    const sql = `INSERT INTO Venues (name, description, city, state, zip, location) VALUES 
    ("${req.body.name}", "${req.body.description}", "${req.body.city}", "${req.body.state}", ${req.body.zip}, "${req.body.location}")`;
    return db.connection.query(sql, (err, data) => {
      if (err) console.log('addVenue Error: ', err);
      callback(err, data);
    })
  };
  // get all venues works!
  app.get('/venues', (req, res) =>{
    getAllVenues((err, data) => {
      if (err) res.json(err);
      res.send(data);
    });
  });

  // add venue works with SQL
  app.post('/venues', (req, res) =>{
    console.log('venue route working')
    // res.send({hi:'new venue added'})
    addVenue(req, (err, data) => {
      if (err) res.json(err);
      
      res.send(data);
    });
  });
}