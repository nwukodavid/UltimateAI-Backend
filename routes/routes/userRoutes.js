const express = require('express');
const router = express.Router();
const { protect } = require('../routes/auth'); // adjust if path is different
const {
  getUserProfile,
  updateUserPlan,
  getUsageStats
} = require('../controllers/userController');

router.get('/profile', protect, getUserProfile);
router.put('/plan', protect, updateUserPlan);
router.get('/usage', protect, getUsageStats);

module.exports = router;
