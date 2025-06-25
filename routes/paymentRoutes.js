const express = require("express");
const router = express.Router();
const {
  handlePaystackPayment,
  handlePaystackWebhook,
} = require("../controllers/paymentController");

router.post("/initialize", handlePaystackPayment);
router.post("/webhook", handlePaystackWebhook);

module.exports = router;
