const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const checkUsageLimits = require('../../middleware/checkUsage');
const User = require('../../models/User');
const axios = require('axios');

// POST /api/chat/ask
router.post('/ask', protect, checkUsageLimits, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use OpenAI API to get response
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    // Update user's message count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { messagesUsedToday: 1 },
    });

    res.json({ reply: answer });
  } catch (error) {
    console.error('Chat error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

module.exports = router;
