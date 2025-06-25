const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const codeRoutes = require('./routes/codeRoutes');
const voiceRoutes = require('./routes/voiceRoutes');
const fileRoutes = require('./routes/fileRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/payments', require('./routes/payments/paystack'));
app.use('/api/files', fileRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/files', require('./routes/files/upload'));
app.use('/api/payment/webhook', require('./routes/payment/webhook'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`UltimateAI backend running on port ${PORT}`);
});
const resetDailyUsage = require('./utils/resetDailyUsage');

setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    resetDailyUsage();
  }
}, 60000); // Check every 1 min
