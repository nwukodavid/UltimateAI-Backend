const User = require('../models/User');

const resetDailyUsage = async () => {
  try {
    await User.updateMany({}, {
      $set: {
        messagesUsedToday: 0,
        imagesUsedToday: 0,
      },
    });
    console.log('Daily usage reset for all users.');
  } catch (error) {
    console.error('Error resetting daily usage:', error);
  }
};

module.exports = resetDailyUsage;
