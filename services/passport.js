const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/index');


passport.serializeUser((user, done ) => {
    console.log('user has been serialized!')
    // let username = user.google_id;
    // if (user) console.log(user);
    // if (!user) console.log('no sure in deserialized user';)
    user = user ? user : null
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
    // console.log('profile', profile)
    // send to db
    db.User.findOne({where : {googleId: profile.id}})
      .then(function(obj) {
        console.log('db.User.findOne: ', obj);
        // if that obj exists
        if (obj) {  
        //   return obj.update({
        //     // accessToken : profile.accessToken, 
        //     // expires_in : profile.expires_in, 
        //     // refreshToken : profile.refreshToken,
        //     // profileJSON : profile._json
        //   })
            return obj;
        } else {
            console.log('no db.User entry found');
            //console.log('profile: ', profile);\
            console.log('profile.id: ', profile.id);
          return db.User.create({
            googleId : profile.id,
            name: profile.displayName,
            // accessToken : profile.accessToken, 
            // expires_in : profile.expires_in, 
            // refreshToken : profile.refreshToken,
            // profileJSON : profile._json
          })
        }
      })
      .then((profile) => done(null, profile))
    }))
