const express = require('express');
const router = express.Router();
const { transcribeAudio } = require('../controllers/voiceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/transcribe', protect, transcribeAudio);

module.exports = router;
