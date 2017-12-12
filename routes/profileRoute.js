const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.get('/api/profile', (req, res) => {
    dbDef.User.findOne({where: {googleId: req.user}})
    .then((data) => {
      // console.log('found user ', data);
      res.send(data);
    })
  })

  app.post('/api/save_photo', (req, res) => {
    console.log('SAVE PHOTO', req.body.img)

    dbDef.User.findOne({ where: {googleId: req.user}})
      .then((data) => {
          data.update({
           photo: req.body.img 
          })
      })
  });

  app.post('/api/task/editprofile', async (req, res) => {
  
    await dbDef.User.findOne({where: {googleId: req.user}})
    .then((data) => {
      data.update(
        req.body.item
      ).then((data) => res.send(data));
    })
  })
}