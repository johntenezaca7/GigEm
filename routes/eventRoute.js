const dbDef = require('../db/index');
// const paypal = require('../services/paypal');
module.exports = (app, db) => {

  // const addEvent = (req, callback) => {
  //   console.log('REK',req);
  //   const sql = `INSERT INTO Event (venue_id, user_id, name, description, photo, start_date, start_time, end_date, final_commit_date, city, state, zip, is_committed, price,min_commits,commits) VALUES
  //     (${req.body.venue_id},${req.body.user_id},"${req.body.name}","${req.body.description}","${req.body.photo}",${req.body.start_date},"${req.body.start_time}",${req.body.end_date},${req.body.final_commit_date},"${req.body.city}","${req.body.state}",${req.body.zip},"${req.body.is_committed}",${req.body.price},${req.body.min_commits},${req.body.commits})`;
  //   const joinsql = `INSERT INTO Event (venue_id, user_id, name, description, photo, start_date, start_time, end_date, final_commit_date, city, state, zip, is_committed, price,min_commits,commits) VALUES
  //     (${req.body.venue_id},${req.body.user_id},"${req.body.name}","${req.body.description}","${req.body.photo}",${req.body.start_date},"${req.body.start_time}",${req.body.end_date},${req.body.final_commit_date},"${req.body.city}","${req.body.state}",${req.body.zip},"${req.body.is_committed}",${req.body.price},${req.body.min_commits},${req.body.commits})`;
  //   return db.connection.query(sql, (err, data) => {
  //     if (err) console.log('getAllEvent Error: ', err);
  //     callback(err, data);
  //   })
  // };

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
      res.send(data);
    })
  });

  app.post('/api/payForEvent', (req, res) => {
    console.log('attempting to pay for event');
    dbDef.Attendance
    .findOne({where: {'UserId': req.body.user, 'ShowcaseId': req.body.gig}})
    .then((attendance) => {
      if (attendance) {
        attendance.update({'isPaid': true})
        res.send('ok');
      } else {
        res.send('err');
      }
    })
  })

  app.post('/api/commit', (req, res) => {
    console.log('/api/commit UserId', req.body.user);
    console.log('/api/commit ShowcaseId', req.body.gig);
    console.log('/api/commit Commit Amount:', req.body.amount);

    dbDef.Attendance
    .findOne({where: {'UserId': req.body.user, 'ShowcaseId': req.body.gig}})
    .then((attendance) => {
      if (attendance) {
        attendance.update({'commitValue': req.body.amount})
      } else {
        dbDef.Attendance.create({
          UserId: req.body.user,
          ShowcaseId: req.body.gig,
          commitValue: req.body.amount
        });
      }
    })
    .then(() => dbDef.Showcase
      .findOne({where: {'id': req.body.gig}})
      .then((show) => {
        show.update({
            commits: show.dataValues.commits + req.body.amount,
        });
      })
    )
    .then(() => res.send('OK'));
  });

  app.post('/api/uncommit', (req, res) => {
    dbDef.Attendance.findOne({
      where: {
        UserId: req.body.user, 
        ShowcaseID: req.body.gig
      }
    })
    .then((attendanceItem) => { if (attendanceItem) attendanceItem.destroy() } ) 
    .then(dbDef.Attendance.findAll()
    .then((attendance) => {
      let returnValue = attendance
      attendance ? res.send(returnValue) : res.send(returnValue)
    }))

    dbDef.Showcase.findOne({
      where: {'id': req.body.gig}
    })
      .then((show) => {
        show.update({
          commits: show.dataValues.commits - (req.body.amount ? req.body.amount : 0)
        })})
    
  });

  app.post('/api/commitCheck', (req, res) => {
    dbDef.Attendance.findAll()
    .then((attendance) => {
      res.send(attendance);
    })
  })

  app.get('/eventsByBand', (req, res) =>{
    dbDef.Showcase.findAll({
      where: { UserId: req.query.userId },
      include: [ { model: dbDef.User} ]
    })
    .then((data) => {
      // console.log('found events: ', data);
      res.send(data);
    });
  });

  app.post('/api/save_event_photo', (req, res) => {
    dbDef.Showcase.findOne({ where: {id: req.body.id}})
      .then((data) => {
          data.update({
           photo: req.body.photo 
          })
      })
      .then(() => res.send('ok'));
  });
  
  // Add Showcase Event and respond with added event obj 
  app.post('/api/addEvent', (req, res) =>{
    // console.log("REQQQQ BODYYYYYYY ", req.body.info);
    dbDef.Showcase.create({
      name: req.body.info.eventName,
      description: req.body.info.eventDescription,
      photo: req.body.info.photo,
      startDate: req.body.info.start,
      endDate: req.body.info.end,
      startTime: req.body.info.startTime,
      finalCommitDate: req.body.info.finalCommitDate,
      address: req.body.info.address,      
      city: req.body.info.city,
      state: req.body.info.state,
      zip: req.body.info.zip,
      isCommitted: req.body.info.isCommitted,
      price: req.body.info.price,
      minCommits: req.body.info.minCommits,
      commits: req.body.info.commits,
      VenueId: req.body.info.VenueId,
      UserId: req.body.info.UserId      
    })
    .then((data) => {
      // console.log("EVENT ADDED DATA: ", data);
      res.send(data);
    })
  });
}
