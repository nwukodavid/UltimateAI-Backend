const express = require('express');
const router = express.Router();
const axios = require('axios');

const User = require('../../models/User');
const { protect } = require('../../middleware/auth');

// Prices in kobo (₦)
const prices = {
  Ultimateplus: 500 * 100,  // ₦500 = $5
  Ultimatepro: 2000 * 100   // ₦2000 = $20
};

// Route to initiate payment
router.post('/initiate', protect, async (req, res) => {
  const { plan } = req.body;
  const amount = prices[plan];

  if (!amount) {
    return res.status(400).json({ error: 'Invalid subscription plan' });
  }

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: req.user.email,
        amount,
        metadata: { plan },
        callback_url: `${process.env.CLIENT_URL}/payment-success`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ url: response.data.data.authorization_url });
  } catch (err) {
    console.error('Paystack error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Paystack payment initialization failed' });
  }
});

module.exports = router;
