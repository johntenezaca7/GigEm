const dbDef = require('../db/index');

module.exports = (app, db) => {

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

  app.get('/api/events', (req, res) =>{
    dbDef.Showcase.findAll({})
    .then((data) => {
      // console.log('found showcases: ', console.log(data));
      res.send(data);
    })
  });

  app.post('/api/myEvents', (req, res) =>{
    dbDef.Showcase.findAll({include: [{Model: dbDef.Attendance}]})
    .then((data) => {
      // console.log('found showcases: ', console.log(data))
      // console.log('myevents data: ', data);
      res.send(data);
    })
  });

  app.post('/api/commit', (req, res) => {
    console.log('/api/commit UserId', req.body.user);
    console.log('/api/commit ShowcaseId', req.body.gig);
    dbDef.Attendance.create({
      UserId: req.body.user,
      ShowcaseId: req.body.gig
    })
    .then(dbDef.Attendance.findAll({ where: {
      UserId: req.body.user
    }}).then((attendance) => {
      // console.log(attendance);
      attendance ? res.send(attendance) : res.send(attendance)
    }))

    dbDef.Showcase.findOne({where: {'id': req.body.gig}})
    .then((show) => {
      show.update({
        commits: show.dataValues.commits + 1
      })
    }) 
  });

  app.post('/api/uncommit', (req, res) => {
    console.log('/api/uncommit UserId', req.body.user);
    console.log('/api/uncommit ShowcaseId', req.body.gig);
        dbDef.Attendance.findOne({
      where: {
        UserId: req.body.user, 
        ShowcaseID: req.body.gig
      }
    })
      .then((attendanceItem) => attendanceItem.destroy())
      .then(dbDef.Attendance.findAll({ where: {
        UserId: req.body.user
      }}).then((attendance) => {
        // console.log(attendance);
        attendance ? res.send(attendance) : res.send(attendance)
      }))

    dbDef.Showcase.findOne({
      where: {'id': req.body.gig
    }})
      .then((show) => {
        show.update({
          commits: show.dataValues.commits - 1
        })})
    
  });

  app.post('/api/commitCheck', (req, res) => {
    console.log('eventRoute.js: attempting to check if user has committed to event');
    console.log('eventRoute.js req.body:')
    console.log(req.body);
    
    dbDef.Attendance.findAll()
    .then((attendance) => {
      // console.log(attendance);
      attendance ? res.send(attendance) : res.send(attendance)
    })
  })

  // dbDef.User.findAll()
  // .then(data => console.log(data));

  app.get('/eventsByBand', (req, res) =>{
    console.log(req.query);
    dbDef.Showcase.findAll({
      where: { UserId: req.query.userId },
      include: [ { model: dbDef.User} ]
 })
    .then((data) => {
      console.log('found events: ', data);
      res.send(data);
    })
  });
  
  // Add Showcase Event and respond with added event obj 
  app.post('/addevent', (req, res) =>{
    console.log("REQQQQ BODYYYYYYY ", req.body);
    dbDef.Showcase.create({
      name: req.body.name,
      description: req.body.description,
      photo: req.body.photo,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      finalCommitDate: req.body.finalCommitDate,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      isCommitted: req.body.isCommitted,
      price: req.body.price,
      minCommits: req.body.minCommits,
      commits: req.body.commits,
      VenueId: req.body.venueId,
      UserId: req.body.userId      
    })
    .then((data) => {
      res.send(data);
    })
  });
}
