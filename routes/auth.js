const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// ✅ Register route (Update this line)
router.post("/register", registerUser);

module.exports = router;

