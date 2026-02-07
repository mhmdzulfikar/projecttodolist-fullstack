const Todo = require('../models/Todo');
const User = require('../models/User'); 
const { Op } = require("sequelize"); 

// ==========================================
// 1. AMBIL DATA + AUTO RESET HARIAN
// ==========================================
const getTodos = async (req, res) => {
    try {
        const userId = req.user.userId;

        
        // A. Tentukan Batas Waktu "Hari Ini" (Jam 00:00 tadi pagi)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); 
        await Todo.update(
            { completed: false }, // Set jadi belum selesai
            {
                where: {
                    userId: userId,
                    completed: true,
                    updatedAt: {
                        [Op.lt]: todayStart //  [Op.lt] artinya "Less Than" (Kurang Dari / Sebelum)
                    }
                }
            }
        );
        // Sekarang ambil datanya (yang udah bersih tadi)
        const todos = await Todo.findAll({ 
            where: { userId: userId }, 
            order: [['createdAt', 'DESC']] 
        });

        res.json(todos);

    } catch (error) {
        console.error("Error Get Todos:", error);
        res.status(500).json({ message: "Gagal mengambil data tugas" });
    }
}

// ==========================================
// 2. TAMBAH TUGAS (Gak Berubah)
// ==========================================
const createTodo = async (req, res) => {
    try {
        const { task } = req.body; 
        
        if (!task || task.trim() === "") {
            return res.status(400).json({ message: "Isi tugas tidak boleh kosong" });
        }

        const newTodo = await Todo.create({ 
            task,                   
            userId: req.user.userId 
        });

        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error Create Todo:", error);
        res.status(500).json({ message: "Gagal menambah tugas" });
    }
}

// ==========================================
// 3. UPDATE TUGAS + SISTEM LEVEL UP  (Gak Berubah)
// ==========================================
const updateTodo = async (req, res) => {
     try {
        const { id } = req.params;
        const { task, completed } = req.body; 
    
        const todo = await Todo.findOne({ 
            where: { id: id, userId: (req).user.userId } 
        });

        if (!todo) {
            return res.status(404).json({ msg: "Tugas tidak ditemukan atau bukan milik Anda" });
        }

        let xpGained = 0;
        let newLevel = null;
        if (completed === true && todo.completed === false) {
            
            const user = await User.findByPk((req ).user.userId);
            
            if (user) {
                //  XP (+10)
                user.xp = (user.xp || 0) + 10; 
                xpGained = 10;
                const calculatedLevel = Math.floor(user.xp / 100) + 1;
                
                
                if (calculatedLevel > (user.level || 1)) {
                    user.level = calculatedLevel;
                    newLevel = calculatedLevel;
                }

                if (task !== undefined) todo.task = task;
                if (completed !== undefined) todo.completed = completed;
                
                await user.save(); 
            }
        }

        // Update status Todo
        todo.completed = completed;
        await todo.save();
        
        // Kirim response lengkap (XP & Level buat animasi di frontend)
        res.json({ message: "Status updated", xpGained, newLevel });

    } catch (error) {
        console.error("Error Update Todo:", error);
        res.status(500).json({ message: "Gagal update tugas" });
    }
};


// ==========================================
// 4. HAPUS TUGAS (Gak Berubah)
// ==========================================
const deleteTodo = async (req, res) => {
    try {
        const result = await Todo.destroy({
            where: { id: req.params.id, userId: req.user.userId }
        });

        if (result === 0) {
            return res.status(404).json({ message: "Tugas tidak ditemukan" });
        }

        res.json({ message: "Todo Deleted" });
    } catch (error) {
        console.error("Error Delete Todo:", error);
        res.status(500).json({ message: "Gagal menghapus tugas" });
    }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };