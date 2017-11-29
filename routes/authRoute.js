module.exports = (app, db) => {

  app.get('/api/check', (req, res) =>{
    console.log('routes working')
    res.send({hi:'data from server when loaded'})
  });

}