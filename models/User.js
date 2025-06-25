const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ['Ultimate-o3', 'Ultimateplus', 'Ultimatepro'],
    default: 'Ultimate-o3',
  },
  messagesUsedToday: {
    type: Number,
    default: 0,
  },
  imagesUsedToday: {
    type: Number,
    default: 0,
  },
  subscriptionExpiresAt: {
    type: Date,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  apiKey: {
    type: String,
  },
  googleId: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
