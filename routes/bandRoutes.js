module.exports = (app, db) => {
  app.post('/bandinfo',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }), 
  );
} 