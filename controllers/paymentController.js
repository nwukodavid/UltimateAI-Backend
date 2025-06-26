// controllers/paymentController.js
const axios = require("axios");

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;

const headers = {
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  "Content-Type": "application/json",
};

// ✅ Handle Paystack Payment Initialization
const handlePaystackPayment = async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack uses kobo (₦1 = 100 kobo)
        callback_url: `${CLIENT_URL}/success`,
      },
      { headers }
    );

    res.status(200).json({
      url: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (err) {
    res.status(500).json({
      error: "Paystack payment initialization failed",
      details: err.response?.data || err.message,
    });
  }
};

// ✅ Mock Webhook (you can later verify signature here)
const handlePaystackWebhook = (req, res) => {
  res.status(200).json({ message: "Webhook received (mock)" });
};

module.exports = {
  handlePaystackPayment,
  handlePaystackWebhook,
};
