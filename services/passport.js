const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/index');


passport.serializeUser((user, done ) => {

    console.log('seralizing', user.id)
    user = user.id || null


    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser')
    done(null, obj);
  });

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
    scope: [
    'profile', 
    'https://www.googleapis.com/auth/user.emails.read'
    ], 
  },

  function(accessToken, refreshToken, params, profile, done) {
    console.log('passport user id: ', profile.id);
    profile.accessToken = accessToken;
    profile.expires_in = params.expires_in;
    if (refreshToken !== undefined) profile.refreshToken = refreshToken;
    // console.log(profile)
    db.User.findOne({where : {googleId: profile.id}})
      .then(function(obj) {
        if (obj.googleId) {
            done(null, obj.googleId)
        } else {
            db.User.create({
                // accessToken: accessToken,
               googleId: profile.id,
               name: profile.displayName,
               email: profile.emails[0].value,
            //    photo: profile.photots[0].value
                })       
        }
      })
      .then((profile) => done(null, profile))
    }))
