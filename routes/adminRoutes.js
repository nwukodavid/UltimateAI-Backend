const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, changeUserRole } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.put('/users/:id/role', protect, adminOnly, changeUserRole);

module.exports = router;
