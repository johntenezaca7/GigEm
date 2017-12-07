const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.get('/api/profile', (req, res) => {
    dbDef.User.findOne({where: {googleId: req.user}})
    .then((data) => {
      // console.log('found user ', data);
      res.send(data);
    })
  })

  app.post('/api/task/editprofile', async (req, res) => {
    console.log('attempting to update profile');
    console.log('req.body: ', req.body);
    // console.log('req.body: ', req.body);
    // console.log(`attempting to update with ${JSON.stringify(req.body.item)}`);
    await dbDef.User.findOne({where: {googleId: req.user}})
    .then((data) => {
      data.update(
        req.body.item
      ).then((data) => res.send(data));
    })
  })
}