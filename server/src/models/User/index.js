const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  roles: [{
    type: String,
    enum: ['user', 'premium', 'moderator', 'admin'],
    default: 'user',
  }],
  subscription: {
    type: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.__v;
  return user;
};

UserSchema.methods.isSubscriptionActive = function() {
  return this.subscription.type !== 'free' && 
         (!this.subscription.endDate || this.subscription.endDate > new Date());
};

UserSchema.methods.hasRole = function(role) {
  return this.roles.includes(role);
};

UserSchema.statics.findByDiscordId = function(discordId) {
  return this.findOne({ discordId: discordId.toString() });
};

module.exports = mongoose.model('User', UserSchema);