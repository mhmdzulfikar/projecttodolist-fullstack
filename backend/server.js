/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database");
const rateLimit = require('express-rate-limit');

// --- 1. IMPORT ROUTES ---
const authRoutes = require('./routes/authRoutes'); 
const todoRoutes = require("./routes/todoRoutes");
const notificationRoutes = require('./routes/notificationRoutes'); 
const cardRoutes = require('./routes/cardRoutes'); 
const noteRoutes = require('./routes/noteRoutes');
const snippetRoutes = require('./routes/snippetRoutes');

// ❌ HAPUS IMPORT CONTROLLER MANUAL DI SINI (SUDAH DIPINDAH KE ROUTES)
// const { getSnippets... } = require("./controllers/snippetController"); // <--- HAPUS

// --- 2. IMPORT MODELS ---
const User = require('./models/User');
const Todo = require('./models/Todo');
const Card = require('./models/Card'); 
const Notification = require('./models/Notification');
const Note = require('./models/Note');
const Snippet = require('./models/Snippet');

dotenv.config();
const app = express(); 

// --- 3. CONFIG RATE LIMITER ---
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 300, 
    standardHeaders: true, 
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Terlalu banyak percobaan login. Tunggu sebentar!"
});

// --- 4. MIDDLEWARE ---
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(express.json()); 
app.use(generalLimiter);

// --- 5. ROUTES ---
app.use('/auth', authLimiter, authRoutes);          
app.use("/todos", todoRoutes);          
app.use('/notifications', notificationRoutes); 
app.use('/cards', cardRoutes);
app.use('/notes', noteRoutes); 

// 🔥 ROUTE SNIPPET (CUKUP SATU BARIS INI AJA)
app.use('/snippets', snippetRoutes);

// ❌ HAPUS BAGIAN MANUAL DI BAWAH INI (KARENA SUDAH ADA DI ATAS)
// app.get('/snippets', verifyToken, getSnippets);  <-- HAPUS
// app.post('/snippets', verifyToken, createSnippet); <-- HAPUS
// app.delete('/snippets/:id', verifyToken, deleteSnippet); <-- HAPUS

// --- 6. SERVER START ---
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected... ✅");

    // --- DEFINISI RELASI ---
    User.hasMany(Todo, { foreignKey: 'userId' });
    Todo.belongsTo(User, { foreignKey: 'userId' });

    User.hasOne(Note, { foreignKey: 'userId' });
    Note.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Snippet, { foreignKey: 'userId' });
    Snippet.belongsTo(User, { foreignKey: 'userId' });

    await db.sync({ alter: true });

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000} 🚀`);
    });
  } catch (error) {
    console.error("Connection error:", error);
  }
};

startServer();