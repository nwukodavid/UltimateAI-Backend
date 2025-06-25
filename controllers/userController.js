const User = require('../models/User');

// Sample controller — update this with real logic later
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic check
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Create user
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};
