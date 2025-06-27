const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../../middleware/auth'); // ✅ Ensure this path is correct

// POST /api/payments/create
router.post('/create', protect, async (req, res) => {
  const { email, amount, planName } = req.body;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount,
        metadata: {
          plan: planName || 'Unknown',
          userId: req.user?._id || 'guest',
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data.data); // Contains authorization_url
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Paystack payment link failed' });
  }
});

module.exports = router;