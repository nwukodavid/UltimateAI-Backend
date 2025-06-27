// server.js
const express         = require('express');
const dotenv          = require('dotenv');
const cors            = require('cors');
const connectDB       = require('./config/db');
const errorHandler    = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ——— Route modules —————————————————————————————————————————
const authRoutes    = require('./routes/authRoutes');
const userRoutes    = require('./routes/userRoutes');
const chatRoutes    = require('./routes/chatRoutes');
const codeRoutes    = require('./routes/codeRoutes');
const voiceRoutes   = require('./routes/voiceRoutes');
const fileRoutes    = require('./routes/fileRoutes');       // <-- top-level fileRoutes.js
const paymentRoutes = require('./routes/paymentRoutes');    // <-- top-level paymentRoutes.js
const webhookRoutes = require('./routes/payment/webhook');  // <-- ./routes/payment/webhook.js
const adminRoutes   = require('./routes/adminRoutes');

// ——— Register each path exactly once ————————————————————————————
app.use('/api/auth',             authRoutes);
app.use('/api/users',            userRoutes);
app.use('/api/chat',             chatRoutes);
app.use('/api/code',             codeRoutes);
app.use('/api/voice',            voiceRoutes);
app.use('/api/files',            fileRoutes);
app.use('/api/payments',         paymentRoutes);
app.use('/api/payment/webhook',  webhookRoutes);
app.use('/api/admin',            adminRoutes);

// ——— Global error handler —————————————————————————————————————
app.use(errorHandler);

// (Optional) midnight reset hook
const resetDailyUsage = require('./utils/resetDailyUsage');
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    resetDailyUsage();
  }
}, 60_000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});