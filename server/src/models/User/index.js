const mongoose = require('mongoose');

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

UserSchema.statics.findByid = function(id) {
  return this.findOne({ id: id.toString() });
};

module.exports = mongoose.model('User', UserSchema);