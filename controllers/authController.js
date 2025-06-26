const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, phone, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  res.json({ message: 'Use sendOTP instead.' });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });
  res.json({ message: 'Password reset successful' });
};

const sendOTP = async (req, res) => {
  // Dummy OTP logic (replace with Brevo or Twilio)
  res.json({ otp: '123456', message: 'OTP sent (mock)' });
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  if (otp === '123456') return res.json({ message: 'OTP verified' });
  res.status(400).json({ message: 'Invalid OTP' });
};

const googleAuth = async (req, res) => {
  res.json({ message: 'Google OAuth placeholder' });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendOTP,
  verifyOTP,
  googleAuth
};
