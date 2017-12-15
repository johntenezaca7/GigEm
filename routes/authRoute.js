const passport = require('passport');
const dbDef = require('../db/index');

module.exports = (app, db) => {

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }), 
    )

    app.get('/auth/google/callback',
        passport.authenticate('google'),
            (req, res) => {
                res.redirect('/userprofile')
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

    app.get('/api/all_users', (req, res) => {
        // console.log('getting current user', req.user)
        dbDef.User.findAll({})
        .then((users) => {
            console.log('ZOOYORK', JSON.stringify(users))
            res.send(users) 
        })
    });

};
