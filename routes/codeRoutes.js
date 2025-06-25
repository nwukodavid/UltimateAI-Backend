const express = require('express');
const router = express.Router();
const { generateCode, fixCode, explainCode } = require('../controllers/codeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateCode);
router.post('/fix', protect, fixCode);
router.post('/explain', protect, explainCode);

module.exports = router;
