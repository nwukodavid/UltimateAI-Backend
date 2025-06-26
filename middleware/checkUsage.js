const User = require('../models/User');

const checkUsageLimits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const plan = user.plan;

    if (plan === 'Ultimate-o3') {
      if (user.messagesUsedToday >= 15) {
        return res.status(403).json({ error: 'Message limit reached for today' });
      }
      if (user.imagesUsedToday >= 10) {
        return res.status(403).json({ error: 'Image upload limit reached for today' });
      }
    }

    next();
  } catch (err) {
    console.error('Check usage error:', err);
    res.status(500).json({ error: 'Server error checking usage limits' });
  }
};

module.exports = checkUsageLimits;
