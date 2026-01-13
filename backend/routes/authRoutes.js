const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware'); // Important!

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// 🔥 ADD THIS LINE:
router.get('/me', verifyToken, getMe); 

module.exports = router;