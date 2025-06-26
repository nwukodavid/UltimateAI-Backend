const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/auth'); // assuming you have auth middleware
const checkUsageLimits = require('../../middleware/checkUsage');
const User = require('../../models/User');

// Handle image upload (simplified mock)
router.post('/image', checkAuth, checkUsageLimits, async (req, res) => {
  try {
    // Increment imagesUsedToday for free plan
    const user = await User.findById(req.user._id);

    if (user.plan === 'Ultimate-o3') {
      user.imagesUsedToday += 1;
      await user.save();
    }

    // Simulate successful upload
    res.status(200).json({ message: 'Image uploaded successfully (mock)' });
  } catch (err) {
    console.error('Image Upload Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
