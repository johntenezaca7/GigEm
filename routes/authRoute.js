const passport = require('passport');


module.exports = (app, db) => {

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }), 
    )

    app.get('/auth/google/callback',
        passport.authenticate('google'),
            (req, res) => {
                res.redirect('/user')
            }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
   
    app.get('/api/current_user', (req, res) => {
        if(!req.user){
            console.log('NOT LOGGED IN')
        } else {
            console.log('getting current user', req.user)
        }
        res.send(req.user)
    });


};