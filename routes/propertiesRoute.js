const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.get('/api/properties', (req, res) => {
    dbDef.Properties.findAll({})
    .then((data) => {
      res.send(data);
    });
  });

  app.post('/api/add_property', (req, res) => {
    dbDef.User.findOne({where: {'googleId': req.user}})
    .then((data) => {
      if (data.dataValues.id === req.body.userid) {
        console.log('creating media item');
        dbDef.Properties.create({
          linkUrl: req.body.linkurl,
          description: req.body.description,
          UserId: req.body.userid
        })
        .then(() => res.send('Media item added.'));
      } else {
        console.log('user not authorized to add item');
        res.send('Not authorized.');
      }});
  });

  app.post('/api/remove_property', (req, res) => {
    dbDef.User.findOne({where: {'googleId': req.user}})
    .then((data) => {
      if (data) {
        dbDef.Properties.findOne(
          { where: {'id': req.body.itemid}})
          .then((mediaItem) => {
            if (mediaItem) mediaItem.destroy();
            console.log('removed media item');
          })
        .then(() => res.send('Media item removed.'));
      } else {
        console.log('user not authorized to remove item');
        res.send('Not authorized.');
      }});
  });

};