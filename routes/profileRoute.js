const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.post('/api/profile', (req, res) => {
    // console.log('attempting to serve profile route');
    // console.log('DATATAT',req.body.params.googleId);

    // res.send(req.body)

    dbDef.User.findOne({where: {googleId: req.body.params.googleId}})
    .then((data) => {
      // console.log('found user ', data);
      res.send(data);
    })
  })

  app.post('/api/task/editprofile', async (req, res) => {
    // console.log('req.body: ', req.body);
    // console.log(`attempting to update with ${JSON.stringify(req.body.item)}`);
    await dbDef.User.findOne({where: {googleId: req.user.googleId}})
    .then((data) => {
      data.update(
        req.body.item
      ).then((data) => res.send(data));
    })
  })
}