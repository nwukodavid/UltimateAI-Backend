const express = require('express');
const router = express.Router();
const { handleStripePayment, handlePaystackWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/stripe', protect, handleStripePayment);
router.post('/paystack-webhook', handlePaystackWebhook);

module.exports = router;
