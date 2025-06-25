const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../../models/User');
const { protect } = require('../../middleware/auth');

router.post('/initiate', protect, async (req, res) => {
  const { plan } = req.body;

  const prices = {
    'Ultimateplus': 500,  // $5 in cents
    'Ultimatepro': 2000   // $20 in cents
  };

  const amount = prices[plan];
  if (!amount) return res.status(400).json({ error: 'Invalid plan' });

  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: req.user.email,
      amount: amount * 100,
      metadata: { plan },
      callback_url: `${process.env.CLIENT_URL}/subscribe-success`
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ url: response.data.data.authorization_url });
  } catch (err) {
    console.error('Paystack error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Paystack payment failed' });
  }
});

router.post('/verify', protect, async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    const data = response.data.data;

    if (data.status === 'success') {
      const plan = data.metadata.plan;
      const duration = 30 * 24 * 60 * 60 * 1000;

      await User.findByIdAndUpdate(req.user._id, {
        plan,
        subscriptionExpiresAt: new Date(Date.now() + duration)
      });

      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (err) {
    console.error('Verification error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
