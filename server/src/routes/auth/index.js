const passport = require('passport');

module.exports = {
  get: (req, res, next) => {
    passport.authenticate('discord')(req, res, next);
  }
};