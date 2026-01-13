

project-todolist/
│
├── backend/
│   ├── controllers/
│   │   ├──  todoController.js
|   |   ├──  cardController.js
|   |   ├──  noteController.js
|   |   ├──  notificationController.js
|   |   ├──  snippetController.js
|   |   └──  todoController.js
|   |
|   ├── middleware
|   |   └──authMiddleware.js
|   |  
│   ├── models/
|   |   ├── Card.js
|   |   ├── Note.js
|   |   ├── Notification.js
|   |   ├── Snippet.js
|   |   ├── Todo.js
│   │   └── User.js
|   |
│   ├── routes/
|   |   ├── authRoutes.js
|   |   ├── cardRoutes.js
|   |   ├── noteRoutes.js
|   |   ├── notificationRoutes.js
│   │   └── todoRoutes.js
|   |
|   ├── node_modules/
|   |
│   ├── config/
│   │   └── database.js
|   | 
│   ├── .env
|   ├── .eslintignore
|   ├── package-lock.json
|   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── vite.svg 
|   ├── node_modules/
│   │
|   |
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTodoForm.jsx
│   │   │   ├── CardNav.css
│   │   │   ├── CardNav.jsx
|   |   |   ├── Footer.jsx
|   |   |   ├── Layout.jsx
|   |   |   ├── Navbar.jsx
|   |   |   ├── NotePad.jsx
|   |   |   ├── NotificationPopup.jsx
|   |   |   ├── Pomodoro.jsx
|   |   |   ├── ProdutivityChart.jsx
|   |   |   ├── Sidebar.jsx
|   |   |   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
|   |   |
│   │   ├── context/
│   │   │   └── TodoContext.jsx
|   |   |
│   │   ├── hooks/
|   |   |   ├── useFetch.js
|   |   |   ├── useProductivityChart.js 
│   │   │   └── useTodo.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
|   |   |   ├── CardNavPage.jsx
|   |   |   ├── Home.jsx
|   |   |   ├── LandingPage.jsx
│   │   │   ├── ChatAi.jsx
│   │   │   ├── Login.jsx -> Cooming Soon
│   │   │   ├── Register.jsx
|   |   |   ├── SnippetLibrary.jsx
|   |   |   └── Todo.jsx
│   │   │   
│   │   ├── services/
|   |   |   ├── api.js 
│   │   │   └── todo.js
│   │   |
│   |   ├── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package-lock.json
|   ├── package.json
|   ├── postcss.config.js
|   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
└── README.md




### 1\. BACKEND (Server & Database) 🛠️

Masuk ke folder backend dulu, lalu install semua "bumbu dapur" ini sekaligus.

**Terminal:**

```bash
cd backend
npm install express cors dotenv pg pg-hstore sequelize nodemon bcryptjs jsonwebtoken
```

**Rinciannya:**

  * `express`: Kerangka server.
  * `cors`: Izin akses frontend ke backend.
  * `dotenv`: Baca file `.env`.
  * `pg` & `pg-hstore`: Koneksi ke PostgreSQL.
  * `sequelize`: Mengelola database pake kodingan JS.
  * `nodemon`: Auto-restart server kalau ada edit file.
  * `bcryptjs`: Mengacak password user (Register).
  * `jsonwebtoken`: Membuat token login (Tiket Masuk).

-----

### 2\. FRONTEND (Tampilan Website) 🎨

Masuk ke folder frontend dulu, lalu install semua fitur (Routing, Grafik, Animasi, Drag Drop) ini sekaligus.

**Terminal:**

```bash
cd frontend
npm install react-router-dom react-icons axios gsap recharts date-fns @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Rinciannya:**

  * `react-router-dom`: Pindah-pindah halaman.
  * `react-icons`: Ikon (Tong sampah, Lonceng, Search).
  * `axios`: Kurir pengantar data ke backend.
  * `gsap`: Animasi mulus (Menu Hamburger).
  * `recharts`: Membuat Grafik Batang di Dashboard.
  * `date-fns`: Format tanggal di grafik.
  * `@dnd-kit/...`: Fitur geser-geser kartu (Drag & Drop).


================================================================
🔗 JADI HUBUNGANNYA SAMA KODINGAN LU:
- api.post('/snippets') -> Lu ngasih paket ke Resepsionis.
- router.post('/snippets', ...) -> Resepsionis nunjuk jalan ke Manajer.
- createSnippet (Controller) -> Manajer ngecek paket & nyuruh anak gudang.
- Snippet.create (Model) -> Anak gudang masukin ke Brankas.
- await -> Manajer NUNGGUIN anak gudang balik. Kalau anak gudang belum bilang "Udah aman bos", Manajer gak bakal ngasih kuitansi ke lu.

MY-PROJECT/
├── server/ (DAPUR)
│   ├── config/         # Koneksi Database
│   │   └── db.js
│   ├── controllers/    # Logika Bisnis (Si Koki)
│   │   └── todoController.js
│   ├── routes/         # Jalur URL (Si Kasir)
│   │   └── todoRoutes.js
│   ├── models/         # Bentuk Data (Resep)
│   │   └── todoModel.js
│   └── index.js        # Pintu Dapur (Main Entry)
│
├── client/ (RUANG MAKAN)
│   ├── src/
│   │   ├── components/ # Bagian Kecil (Button, Card)
│   │   │   └── TodoItem.jsx
│   │   ├── pages/      # Halaman Utuh
│   │   │   └── Dashboard.jsx
│   │   ├── services/   # Jembatan ke Backend (Axios/Fetch)
│   │   │   └── todoService.js
│   │   └── App.jsx
│   └── package.json
└── package.json

================================================================

📘 FULLSTACK ARCHITECTURE HANDBOOK
Project: Code Library / Hack Nassa Stack: React (Vite), Node.js (Express), PostgreSQL (Sequelize) Date: 13 Januari 2026

1. THE BIG PICTURE (Alur Data) 🗺️
Gimana caranya data pindah dari klik tombol di React sampe kesimpen di Hardisk Server?

Konsep: MVC (Model-View-Controller) + Middleware.

Client (React): User klik "Simpan".

Route (/snippets): Pintu gerbang URL.

Middleware (Satpam): Cek tiket (Token). Valid? Lanjut. Gak valid? Usir.

Controller (Manajer): Terima data, panggil Model.

Model (SOP/Gudang): Validasi bentuk data (String/Int).

Database (Postgres): Simpan fisik data.

2. BACKEND SECURITY (The Gatekeeper) 🛡️
A. Middleware (verifyToken)
Fungsinya menjaga rute rahasia. Kita nggak percaya siapa pun kecuali yang bawa Token.

Logic:

Ambil header Authorization: Bearer <token>.

Pecahkan token (jwt.verify).

PENTING: Ambil data asli user dari dalam token, terus tempel ke req.user.

Kenapa? Biar di langkah selanjutnya kita tau siapa yang lagi akses tanpa perlu nanya password lagi.

B. Controller Logic (createSnippet)
Disini terjadi "Business Logic" yang cerdas.

User Input (req.body): Judul, Code, Bahasa.

System Input (req.user): User ID (Pemilik).

RULE KERAS: Jangan pernah ambil userId dari input form manual. Ambil selalu dari req.user.userId (hasil token).

Kenapa? Mencegah user iseng ngaku-ngaku jadi orang lain (Identity Spoofing).

3. DATABASE INTEGRITY (The Blueprint) 🏗️
Model (SnippetModel.js)
Kita pake Sequelize buat ngatur aturan main data.

DataTypes.TEXT vs STRING:

Snippet Code pake TEXT karena kodingan bisa panjang banget (>255 karakter).

allowNull: false:

Data haram masuk kalau kosong. Menjaga database tetap bersih dari sampah.

freezeTableName: true:

Mencegah Sequelize sotoy nambahin huruf 's' di nama tabel.

4. FRONTEND INTEGRATION (The Bridge) 🌉
Gimana React ngobrol sama Backend yang dijaga Satpam?

A. Penyimpanan Kunci (LoginPage.jsx)
Saat login sukses:

JavaScript

// Backend ngasih tiket (accessToken)
// Frontend WAJIB simpan di saku (LocalStorage)
localStorage.setItem('token', response.accessToken);
B. Pengirim Otomatis (api.js - Axios Interceptor)
Ini fitur "Auto-Pilot". Kita gak perlu tempel token manual tiap kali request.

Cara Kerja:

Setiap kali api.get atau api.post dipanggil...

Interceptor "Ngerogoh saku" (localStorage.getItem('token')).

Kalau ada token, tempel ke Header Authorization.

Baru kirim request.

5. ENGLISH CORNER (Bonus) 🇬🇧
Lo juga belajar Simple Past Tense hari ini buat cerita soal kejadian lampau.

Rumus:

Positif (+): Subject + V2

I felt tired but strong. (Benar)

I was felt... (Salah)

Negatif (-): Subject + Didn't + V1

I didn't sleep after Fajr. (Benar)

I didn't slept... (Salah - Double Past)

✅ STATUS PROYEK SAAT INI
Auth: 🟢 Done (Login, Register, Logout).

Snippet CRUD: 🟢 Done (Create, Read, Update, Delete).

Security: 🟢 Done (JWT & Middleware).

UI/UX: 🟢 Done (DaisyUI, Dark Mode, Minimalist Hover).

Next Level Challenge (Buat Masa Depan):

Deploy ke VPS Linux (Bukan Vercel).

Implementasi Docker.

Documentation End. Signed, Your AI Thought Partner. 👊