const dbDef = require('../db/index');

module.exports = (app, db) => {
  // const getAllEvents = (callback) => {
  //   const sql = `SELECT * FROM Event`;
  //   const joinsql = `SELECT Event.venue_id, Users.name, Event.name, Event.description, Event.photo, Event.start_date, Event.start_time, Event.end_date, Event.final_commit_date, Event.city, Event.state, Event.zip, Event.is_committed, Event.price, Event.min_commits, Event.commits
  //    FROM Event INNER JOIN Users ON Event.user_id=Users.id`;
  //   return db.connection.query(joinsql, (err, data) => {
  //     if (err) console.log('getAllEvent Error: ', err);
  //     callback(err, data);
  //   })
  // };

  // const sql = `INSERT INTO Event (venue_id,band_id,name,description,photo,start_date,start_time,end_date,final_commit_date,city,state,zip,status,price,min_commits,commits) VALUES
  // (${req.body.venue_id},${req.body.band_id},${req.body.name},${req.body.description},${req.body.photo},${req.body.start_date},${req.body.start_time},${req.body.end_date},${req.body.final_commit_date},${req.body.city},${req.body.state},${req.body.zip},${req.body.status},${req.body.price},${req.body.min_commits},${req.body.commits})`;
  // console.log(sql);


  const addEvent = (req, callback) => {
    // console.log('REK',req)
const sql = `INSERT INTO Event (venue_id, user_id, name, description, photo, start_date, start_time, end_date, final_commit_date, city, state, zip, is_committed, price,min_commits,commits) VALUES
  (${req.body.venue_id},${req.body.user_id},"${req.body.name}","${req.body.description}","${req.body.photo}",${req.body.start_date},"${req.body.start_time}",${req.body.end_date},${req.body.final_commit_date},"${req.body.city}","${req.body.state}",${req.body.zip},"${req.body.is_committed}",${req.body.price},${req.body.min_commits},${req.body.commits})`;
  const joinsql = `INSERT INTO Event (venue_id, user_id, name, description, photo, start_date, start_time, end_date, final_commit_date, city, state, zip, is_committed, price,min_commits,commits) VALUES
  (${req.body.venue_id},${req.body.user_id},"${req.body.name}","${req.body.description}","${req.body.photo}",${req.body.start_date},"${req.body.start_time}",${req.body.end_date},${req.body.final_commit_date},"${req.body.city}","${req.body.state}",${req.body.zip},"${req.body.is_committed}",${req.body.price},${req.body.min_commits},${req.body.commits})`;
    return db.connection.query(sql, (err, data) => {
      if (err) console.log('getAllEvent Error: ', err);
      callback(err, data);
    })
  };

  app.get('/api/events', (req, res) =>{;
    dbDef.Showcase.findAll({})
    .then((data) => {
      // console.log('found showcases: ', console.log(data));
      res.send(data);
    })
  });
  
  app.post('/api/addevent', (req, res) =>{
    console.log(req.body);
    addEvent(req, (err, data) => {
      if (err) res.json(err);
      
      res.send(data);
    });
  });
}
