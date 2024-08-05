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
    let user = await User.findOne({ id: profile.id });

    if (!user) {
      user = new User({
        id: profile.id,
        username: profile.username,
        discriminator: profile.discriminator,
        avatar: profile.avatar,
      });
    } else {
      user.username = profile.username;
      user.avatar = profile.avatar;
    }

    user.lastLogin = new Date();
    await user.save();

    client.logToDiscord(config.server.channels.login,
      `**${profile.username}** adlı kullanıcı siteye giriş yaptı.`)
    done(null, user);
  } catch (error) {
    logger.error('Error in Discord strategy:', error);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByid(id);
    done(null, user);
  } catch (error) {
    logger.error('Error in deserializeUser:', error);
    done(error, null);
  }
});