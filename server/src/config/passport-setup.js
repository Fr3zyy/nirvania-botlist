const passport = require('passport');
const { Strategy: DiscordStrategy } = require('passport-discord');
const User = require('../models/User');
const config = require('./settings');

passport.use(new DiscordStrategy({
  clientID: config.auth.clientId,
  clientSecret: config.auth.clientSecret,
  callbackURL: config.auth.callbackUrl,
  scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findByDiscordId(profile.id);

    if (!user) {
      user = new User({
        discordId: profile.id,
        username: profile.username,
        discriminator: profile.discriminator,
        avatar: profile.avatar,
      });
    } else {
      user.username = profile.username;
      user.discriminator = profile.discriminator;
      user.avatar = profile.avatar;
    }

    user.lastLogin = new Date();
    await user.save();

    done(null, user);
  } catch (error) {
    logger.error('Error in Discord strategy:', error);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await User.findByDiscordId(discordId);
    done(null, user);
  } catch (error) {
    logger.error('Error in deserializeUser:', error);
    done(error, null);
  }
});