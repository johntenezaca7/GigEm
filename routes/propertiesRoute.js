const dbDef = require('../db/index');

module.exports = (app, db) => {
  app.get('/api/properties', (req, res) => {
    dbDef.Properties.findAll({})
    .then((data) => {
      res.send(data);
    });
  });

  app.post('/api/add_property', (req, res) => {
    // console.log(req.body);
    dbDef.Properties.create({
      linkUrl: req.body.linkurl,
      description: req.body.description,
      UserId: req.body.userid
    })
    .then(() => res.send('good.'));
    // .then(console.log('added item')));
  });

  app.post('/api/remove_property', (req, res) => {
    // need some authentication
    // console.log('attempting to remove item, req.body: ', req.body);
    dbDef.Properties.findOne({ where: 
      {'id': req.body.itemid}})
      .then((mediaItem) => {
        // console.log('found media item: ', mediaItem);
        if (mediaItem) mediaItem.destroy();
        console.log('removed media item');
      })
      .then(dbDef.Properties.findAll({})
      .then((data) => {
        res.send(data);
      }));
  });
}