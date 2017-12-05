const dbDef = require('../db/index');

module.exports = (app, db) => {

  // Gett all showcase events
  app.get('/events', (req, res) =>{;
    dbDef.Showcase.findAll({})
    .then((data) => {
      // console.log('found showcases: ', console.log(data));
      res.send(data);
    })
  });

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
