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
<<<<<<< 779d08ce2fa6d0bec83b85ff105aced3c73e3f5b
                res.redirect('/userProfile')
=======
                res.redirect('/userprofile')
>>>>>>> fixed reduxform package
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
<<<<<<< 779d08ce2fa6d0bec83b85ff105aced3c73e3f5b
        res.send(req.user)
    });
     
=======
    });

>>>>>>> fixed reduxform package

};