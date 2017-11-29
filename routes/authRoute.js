const passport = require('passport');

module.exports = (app, db) => {

<<<<<<< HEAD
  app.get('/api/check', (req, res) =>{
    console.log('routes working')
    res.send({hi:'data from server when loaded'})
  });
=======
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    ); 

    app.get('/auth/google/callback',
        passport.authenticate('google'),
            (req, res) => {
                res.send({you: 'passed'})
            }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    });

>>>>>>> finished google oauth, added cookie sessions, user can sign in and log out

};