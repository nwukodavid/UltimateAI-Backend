const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    type: String, // 'stripe' or 'paystack'
    status: String,
    reference: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
