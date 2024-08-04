const mongoose = require('mongoose');

const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

const UserSchema = new mongoose.Schema({
  id: {
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
    enum: Object.values(ROLES),
    default: [ROLES.USER]
  }],
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
UserSchema.methods.hasRole = function(role) {
  return this.roles.includes(role);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  return user;
};

UserSchema.methods.isSubscriptionActive = function () {
  return this.subscription.type !== 'free' &&
    (!this.subscription.endDate || this.subscription.endDate > new Date());
};

UserSchema.methods.hasRole = function (role) {
  return this.roles.includes(role); 
};

UserSchema.statics.findByid = function (id) {
  return this.findOne({ id: id.toString() });
};
UserSchema.methods.isAdmin = function() {
  return this.hasRole(ROLES.ADMIN);
};

module.exports = mongoose.model('User', UserSchema);