const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.get('/profile', (req, res) => {
    console.log('attempting to serve profile route');
    console.log(req.user.googleId);

    dbDef.User.findOne({where: {googleId: req.user.googleId}})
    .then((data) => {
      console.log('found user ', console.log(data));
      res.send(data);
    })
  })
}