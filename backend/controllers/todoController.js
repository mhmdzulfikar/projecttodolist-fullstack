const Todo = require('../models/Todo');
const User = require('../models/User'); // Pastikan User di-import untuk gamifikasi

// 1. AMBIL SEMUA DATA (Milik User yang Login)
// 1. AMBIL SEMUA DATA (Milik User yang Login)
// "async" = Tanda di pintu dapur: "Sabar ya, proses ini butuh waktu (nggak instan)!"
const getTodos = async (req, res) => {
    
    // JARIP PENGAMAN (Airbag)
    // Kita "COBA" (try) dulu lakuin tugasnya. 
    // Kalau lancar -> Lanjut. Kalau meledak -> Lempar ke 'catch'.
    try {
        
        // MULAI OPERASI DAPUR (Database)
        // "await"        = Tombol PAUSE. "Eh script, TUNGGUIN database nyari dulu. Jangan lari duluan!"
        // "Todo.findAll" = Perintah ke Gudang: "Cariin semua data Tugas dong..."
        const todos = await Todo.findAll({ 
            
            // LOGIKA SATPAM / FILTER:
            // "...TAPI SYARATNYA: Cuma ambil data yang 'userId'-nya sama kayak ID orang yang lagi login."
            // (req.user.userId = KTP User yang dibawa pas Login).
            where: { userId: req.user.userId }, 
            
            // LOGIKA KERAPIHAN:
            // "Urutkan berdasarkan Tanggal Dibuat (createdAt)."
            // "DESC" (Descending) = Yang paling BARU ditaruh di paling ATAS.
            order: [['createdAt', 'DESC']] 
        });

        // SUKSES (Mulut Server Ngomong Baik):
        // "Nih Bos (Frontend), datanya udah ketemu semua. Silakan dimakan."
        res.json(todos);

    } catch (error) {
        // TANGKAP MASALAH:
        // Kalau pas 'try' di atas ada yang error (Database mati / Kodingan salah),
        // Langsung lompat ke sini biar aplikasi gak crash.

        // LAPORAN POLISI (Buat Programmer liat di Terminal):
        // "Error Get Todos:" = Judul Beritanya.
        // error              = Detail teknis kenapa meledak.
        console.error("Error Get Todos:", error);

        // ERROR RESPONSE (Mulut Server Minta Maaf):
        // status(500) = Kode "Maaf Bos, Server/Dapur Kebakaran (Internal Server Error)".
        // .json(...)  = Kasih pesan sopan ke User biar gak bingung.
        res.status(500).json({ message: "Gagal mengambil data tugas" });
    }
}


// ==========================================
// 2. TAMBAH TUGAS BARU (createTodo)
// ==========================================
const createTodo = async (req, res) => {
    try {
        // BONGKAR PAKET (Input):
        // req.body = Amplop surat dari Frontend.
        // Kita ambil isinya yang bernama "task" (misal: "Belajar Node.js").
        const { task } = req.body; 
        
        // SATPAM PINTU DEPAN (Validasi):
        // Cek: Apakah isinya kosong? Atau cuma spasi doang (.trim())?
        if (!task || task.trim() === "") {
            // Kalau kosong, USIR BALIK! Maka ke retrun
            // 400 = Bad Request (Salah User).
            return res.status(400).json({ message: "Isi tugas tidak boleh kosong" });
            // Nanti User dapat message "Isi tugas tidak boleh kosong"
        }

        // KOKI MEMASAK (Database):
        // Todo.create = "Woy Database, buatin baris baru dong!"
        const newTodo = await Todo.create({ 
            task,                   // 1. Isinya apa? (Dari input user)
            userId: req.user.userId // 2. PUNYA SIAPA? (PENTING! Dapet dari Token Login)
                                    //    Biar tugasnya gak nyasar ke akun orang lain.
        });

        // HIDANGAN SIAP (Response):
        // 201 = Created (Berhasil Dibuat).
        // Kita kirim balik data barunya biar bisa langsung muncul di layar user.
        res.status(201).json(newTodo);

    } catch (error) {
        console.error("Error Create Todo:", error);
        res.status(500).json({ message: "Gagal menambah tugas" });
    }
}

// ==========================================
// 3. UPDATE TUGAS + SISTEM LEVEL UP 🎮
// ==========================================
const updateTodo = async (req, res) => {
    try {
        // AMBIL ID DARI URL (req.params):
        // Misal linknya: /todos/5  --> id = 5
        const { id } = req.params;
        
        // AMBIL STATUS BARU (req.body):
        // completed = true (Selesai) atau false (Belum).
        const { completed } = req.body; 
        
        // --- LANGKAH A: CARI BARANGNYA ---
        // Kita cari tugas nomor 5, TAPI...
        // HARUS punya user yang lagi login. Jangan sampe ngedit tugas orang lain!
        const todo = await Todo.findOne({ 
            where: { id, userId: req.user.userId } 
        });

        // Kalau gak ketemu (atau bukan punyanya):
        if (!todo) {
            return res.status(404).json({ msg: "Tugas tidak ditemukan atau bukan milik Anda" });
        }

        // --- LANGKAH B: LOGIKA GAMIFIKASI (RPG) 🎮 ---
        let xpGained = 0;
        let newLevel = null;

        // SYARAT DAPET XP:
        // 1. User minta 'completed: true' (Menyelesaikan).
        // 2. Status lama 'todo.completed' masih false (Belum selesai).
        // (Jadi kalau batalin tugas / uncheck, gak dapet XP).
        if (completed === true && todo.completed === false) {
            
            // Panggil Data User (Player) dari Database
            const user = await User.findByPk(req.user.userId);
            
            if (user) {
                // 1. KASIH XP (+10 Poin)
                user.xp = (user.xp || 0) + 10; 
                xpGained = 10;

                // 2. HITUNG LEVEL
                // Rumus: Setiap 100 XP naik 1 level.
                // Math.floor(150 / 100) = 1. (+1 jadi Level 2).
                const calculatedLevel = Math.floor(user.xp / 100) + 1;
                
                // 3. CEK NAIK LEVEL GAK?
                // Kalau level hitungan > level sekarang, berarti LEVEL UP!
                if (calculatedLevel > (user.level || 1)) {
                    user.level = calculatedLevel;
                    newLevel = calculatedLevel; // Simpen info buat dikirim ke frontend (Pop Up)
                }

                // Simpan Stats User yang baru
                await user.save(); 
            }
        }

        // --- LANGKAH C: SIMPAN STATUS TUGAS ---
        // Update status coret/nggak coret di database tugas.
        todo.completed = completed;
        await todo.save();
        
        // LAPOR KE FRONTEND:
        // "Sukses bos! Ini hadiah XP dan Level barumu (kalau ada)."
        res.json({ 
            message: "Status updated", 
            xpGained, 
            newLevel 
        });

    } catch (error) {
        console.error("Error Update Todo:", error);
        res.status(500).json({ message: "Gagal update tugas" });
    }
}

// ==========================================
// 4. HAPUS TUGAS (deleteTodo)
// ==========================================
const deleteTodo = async (req, res) => {
    try {
        // MESIN PENGHANCUR KERTAS (Destroy):
        // Hapus tugas dengan ID sekian, DAN HARUS MILIK USER INI.
        const result = await Todo.destroy({
            // Pake where agar lebih spesifik id User yang di tuju
            where: { id: req.params.id, userId: req.user.userId }
        });

        // CEK HASIL PENGHANCURAN:
        // result = 0 artinya GAK ADA yang kehapus (Mungkin ID salah / Punya orang lain).
        if (result === 0) {
            return res.status(404).json({ message: "Tugas tidak ditemukan" });
        }

        // SUKSES TERHAPUS
        res.json({ message: "Todo Deleted" });
        
    } catch (error) {
        console.error("Error Delete Todo:", error);
        res.status(500).json({ message: "Gagal menghapus tugas" });
    }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };