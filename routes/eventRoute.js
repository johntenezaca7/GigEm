module.exports = (app, db) => {
    
  const getAllEvents = (callback) => {
    const sql = `SELECT * FROM Event`;
    return db.connection.query(sql, (err, data) => {
      if (err) console.log('getAllEvent Error: ', err);
      callback(err, data);
    })
  };

  // const sql = `INSERT INTO Event (venue_id,band_id,name,description,photo,start_date,start_time,end_date,final_commit_date,city,state,zip,status,price,min_commits,commits) VALUES
  // (${req.body.venue_id},${req.body.band_id},${req.body.name},${req.body.description},${req.body.photo},${req.body.start_date},${req.body.start_time},${req.body.end_date},${req.body.final_commit_date},${req.body.city},${req.body.state},${req.body.zip},${req.body.status},${req.body.price},${req.body.min_commits},${req.body.commits})`;
  // console.log(sql);


  const addEvent = (req, callback) => {
    // console.log('REK',req)
const sql = `INSERT INTO Event (venue_id,band_id,name,description,photo,start_date,start_time,end_date,final_commit_date,city,state,zip,status,price,min_commits,commits) VALUES
  (${req.body.venue_id},${req.body.band_id},"${req.body.name}","${req.body.description}","${req.body.photo}",${req.body.start_date},"${req.body.start_time}",${req.body.end_date},${req.body.final_commit_date},"${req.body.city}","${req.body.state}",${req.body.zip},"${req.body.status}",${req.body.price},${req.body.min_commits},${req.body.commits})`;
    return db.connection.query(sql, (err, data) => {
      if (err) console.log('getAllEvent Error: ', err);
      callback(err, data);
    })
  };

  app.get('/events', (req, res) =>{
    getAllEvents((err, data) => {
      if (err) res.json(err);
      
      res.send(data);
    });
  });
  
  app.post('/addevent', (req, res) =>{
    // console.log('REQ BODY: ', req.body);
    // let venue_id = req.body.venue_id || null;
    // console.log('here',venue_id)
    // let band_id = req.body.band_id || null;
    // let name = req.body.name || null;
    // let description = req.body.description || null;
    // let photo = req.body.photo || null;
    // let start_date = req.body.start_date || null;
    // let start_time = req.body.start_time || null;
    // let end_date = req.body.end_date || null;
    // let final_commit_date = req.body.final_commit_date || null;
    // let city = req.body.city || null;
    // let state = req.body.state || null;
    // let zip = req.body.zip || null;
    // let status = req.body.status || null;
    // let price = req.body.price || null;
    // let min_commits = req.body.min_commits || null;
    // let commits = req.body.commits || null;

    addEvent(req, (err, data) => {
      if (err) res.json(err);
      
      res.send("SUCCESSFULLY ADDED EVENT PAGE");
    });
  });
}
