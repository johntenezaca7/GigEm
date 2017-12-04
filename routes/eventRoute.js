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

  app.get('/events', (req, res) =>{;
    dbDef.Showcase.findAll({})
    .then((data) => {
      // console.log('found showcases: ', console.log(data));
      res.send(data);
    })
  });
  
  app.post('/addevent', (req, res) =>{
    console.log(req.body);
    // ${req.body.venue_id},${req.body.user_id},"${req.body.name}","${req.body.description}","${req.body.photo}",${req.body.start_date},"${req.body.start_time}",${req.body.end_date},${req.body.final_commit_date},"${req.body.city}","${req.body.state}",${req.body.zip},"${req.body.is_committed}",${req.body.price},${req.body.min_commits},${req.body.commits
    // req.body.description
    dbDef.Showcase.create({
      name: req.body.name,
      description: req.body.description,
      photo: req.body.photo,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      finalCommitDate: req.body.finalCommitDate,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      isCommitted: req.body.isCommitted,
      price: req.body.price,
      minCommits: req.body.minCommits,
      commits: req.body.commits,
      venueId: req.body.venueId,
      userId: req.body.userId      
    })
    .then((data) => {
      console.log('ADD EVENT DATA RESONSE: ', data.dataValues);
      res.send(data);
    })
    // addEvent(req, (err, data) => {
    //   if (err) res.json(err);
      
    //   res.send(data);
    // });
  });
}
