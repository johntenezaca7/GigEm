const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/index');


passport.serializeUser((user, done ) => {
    console.log('user has been serialized!')
    // let username = user.google_id;
    console.log(user);
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
    //   console.log(profile);
    profile.accessToken = accessToken;
    profile.expires_in = params.expires_in;
    if (refreshToken !== undefined) profile.refreshToken = refreshToken;
    // console.log('profile', profile)
    // send to db
    db.User.findOne({where : {googleId: profile.id}})
      .then(function(obj) {
        // if that obj exists
        if (obj) {
          return obj.update({
            accessToken : profile.accessToken, 
            expires_in : profile.expires_in, 
            refreshToken : profile.refreshToken,
            profileJSON : profile._json
          })
        } else {
          return User.create({
            googleId : profile.id,
            accessToken : profile.accessToken, 
            expires_in : profile.expires_in, 
            refreshToken : profile.refreshToken,
            profileJSON : profile._json
          })
        }
      })
      .then(done(null, profile))
    }))
