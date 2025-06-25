const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    subscriptionPlan: { type: String, default: 'free' },
    apiKey: { type: String },
    googleId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
