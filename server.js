// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// middlewares
const errorHandler = require('./middleware/errorHandler');

// route modules
const authRoutes       = require('./routes/authRoutes');       // your signup/login/etc
const chatRoutes       = require('./routes/chatRoutes');
const codeRoutes       = require('./routes/codeRoutes');
const voiceRoutes      = require('./routes/voiceRoutes');
const fileUploadRoutes = require('./routes/files/upload');
const paystackRoutes   = require('./routes/payments/paystack');
const webhookRoutes    = require('./routes/payment/webhook');
const adminRoutes      = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Register each path exactly once:
app.use('/api/auth',    authRoutes);
app.use('/api/chat',    chatRoutes);
app.use('/api/code',    codeRoutes);
app.use('/api/voice',   voiceRoutes);
app.use('/api/files',   fileUploadRoutes);
app.use('/api/payments',      paystackRoutes);
app.use('/api/payment/webhook', webhookRoutes);
app.use('/api/admin',   adminRoutes);

// Global error handler
app.use(errorHandler);

// Daily reset hook
const resetDailyUsage = require('./utils/resetDailyUsage');
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    resetDailyUsage();
  }
}, 60_000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`UltimateAI backend running on port ${PORT}`);
});