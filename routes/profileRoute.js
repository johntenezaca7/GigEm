const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.post('/profile', (req, res) => {
    // console.log('attempting to serve profile route');
    console.log('BODYY',req.body);

    res.send({hello:'PROFILEROUTES'})
    // dbDef.User.findOne({where: {googleId: req.user.googleId}})
    // .then((data) => {
    //   console.log('found user ', console.log(data));
    //   res.send(data);
    // })
  })
}