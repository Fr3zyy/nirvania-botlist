const passport = require('passport');

module.exports = {
  get: [
    passport.authenticate('discord', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  ]
};