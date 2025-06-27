const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user's subscription plan
exports.updateUserPlan = async (req, res) => {
  try {
    const { plan } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { plan },
      { new: true }
    );
    res.json({ message: 'Plan updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get usage stats
exports.getUsageStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      messagesUsedToday: user.messagesUsedToday,
      imagesUsedToday: user.imagesUsedToday,
      plan: user.plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};