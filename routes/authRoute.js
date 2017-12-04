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

    const getUserByGoogleId = (req, callback) => {
        console.log('getUserbygoogleid');
        console.log(req.user)
        const sql = `SELECT * FROM Users WHERE google_id="${req.user[0].google_id}"`;
        return db.connection.query(sql, (err, data) => {
            if (err) console.log('getUserByGoogId Error: ', err);
            callback(err, data);
        })
    };
    
    app.get('/api/current_user', (req, res) => {
        console.log('getting current user', req.user)
        res.send(req.user)
   
    });


};