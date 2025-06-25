const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/create', async (req, res) => {
  const { email, amount, planName } = req.body;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount,
        metadata: {
          plan: planName || 'Unknown'
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
