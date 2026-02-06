// File: backend/routes/snippetRoutes.js
const express = require('express');
const router = express.Router();

// 1. IMPORT MIDDLEWARE (Cek Jalur)
// Coba import sebagai object dulu buat dicek isinya
const authMiddleware = require('../middleware/authMiddleware');

// 2. IMPORT CONTROLLER (Cek Jalur)
// Coba import sebagai object dulu
const snippetController = require('../controllers/snippetController'); // Pastikan nama file cocok (huruf kecil/besar)

// Ambil fungsi yang kita butuhkan
const verifyToken = authMiddleware.verifyToken; // Atau authMiddleware.authenticateToken?
const { getSnippets, createSnippet, updateSnippet, deleteSnippet } = snippetController;

// CEK SATU-SATU: SIAPA YANG KOSONG?
if (!verifyToken) {
    console.error("❌ ERROR FATAL: 'verifyToken' tidak ditemukan di authMiddleware!");
    console.error("   Cek file: backend/middleware/authMiddleware.js");
    console.error("   Apakah exportnya 'verifyToken' atau 'authenticateToken'?");
}

if (!getSnippets) console.error("❌ ERROR FATAL: 'getSnippets' KOSONG (Undefined)!");
if (!createSnippet) console.error("❌ ERROR FATAL: 'createSnippet' KOSONG (Undefined)!");
if (!updateSnippet) console.error("❌ ERROR FATAL: 'updateSnippet' KOSONG (Undefined)!");
if (!deleteSnippet) console.error("❌ ERROR FATAL: 'deleteSnippet' KOSONG (Undefined)!");
// ======================================


// === DEFINISI ROUTES ===
// Kalau salah satu variabel di atas undefined, baris di bawah ini yang bikin crash

// 1. GET
router.get('/', verifyToken, getSnippets);

// 2. POST
router.post('/', verifyToken, createSnippet);

// 3. PUT
router.put('/:id', verifyToken, updateSnippet);

// 4. DELETE
router.delete('/:id', verifyToken, deleteSnippet);

module.exports = router;