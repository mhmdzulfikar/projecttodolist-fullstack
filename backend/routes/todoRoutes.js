const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
// 🔥 1. IMPORT MIDDLEWARE (SATPAM)
const { verifyToken } = require('../middleware/authMiddleware'); 

const router = express.Router();

// 🔥 2. PASANG SATPAM DI SEMUA PINTU
// Kalau gak ada 'verifyToken', Controller bakal error karena gatau siapa user-nya
router.get('/', verifyToken, getTodos);
router.post('/', verifyToken, createTodo); 
router.put('/:id', verifyToken, updateTodo);
router.delete('/:id', verifyToken, deleteTodo);

// Jadi paki :id atau hanya / itu tergantung kebutuhan. pakai id agar lebih spesifik user mana yang mau di tuju. 

module.exports = router;