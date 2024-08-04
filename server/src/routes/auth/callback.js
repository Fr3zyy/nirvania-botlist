const config = require('@/src/config/settings');
const passport = require('passport');

module.exports = {
  get: [
    passport.authenticate('discord', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect(config.website.frontEnd);
    }
  ]
};