const Todo = require('../models/Todo');
const User = require('../models/User'); 
const { Op } = require("sequelize"); 

// ==========================================
// 1. GET DATA
// ==========================================
const getTodos = async (req, res) => {
    try {
        const userId = req.user.userId;

        
        // A. Tentukan Batas Waktu "Hari Ini" (Jam 00:00 tadi pagi)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); 
        await Todo.update(
            { completed: false },  // Set is not done
            {
                where: {
                    userId: userId,
                    completed: true,
                    updatedAt: {
                        [Op.lt]: todayStart //  [Op.lt] is it Less Than
                    }
                }
            }
        );
        // Now get the data
        const todos = await Todo.findAll({ 
            where: { userId: userId }, 
            order: [['createdAt', 'DESC']] 
        });

        res.json(todos);

    } catch (error) {
        console.error("Error Get Todos:", error);
        res.status(500).json({ message: "Failed to get the data" });
    }
}

// ==========================================
// 2. ADD TO DO 
// ==========================================
const createTodo = async (req, res) => {
    try {
        const { task } = req.body; 
        
        if (!task || task.trim() === "") {
            return res.status(400).json({ message: "The Data is not unfined" });
        }

        const newTodo = await Todo.create({ 
            task,                   
            userId: req.user.userId 
        });

        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error Create Todo:", error);
        res.status(500).json({ message: "Failed to Add Task" });
    }
}

// ==========================================
// 3. UPDATE TO DO + SYSTEM LEVEL UP 
// ==========================================
   const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body; 
    
        // 1. Find the Todo item
        const todo = await Todo.findOne({ 
            where: { id: id, userId: req.user.userId } 
        });

        if (!todo) {
            return res.status(404).json({ msg: "Task not found" });
        }

        // --- PART A: GAMIFICATION (XP & LEVEL) ---
        let xpGained = 0;
        let newLevel = null;

        // LOGIC: Check if User is finishing the task AND XP has NOT been given yet.
        // We use (todo.isXpGiven || false) to handle if the column is null initially.
        if (completed === true && todo.completed === false && (todo.isXpGiven === false || todo.isXpGiven === null)) {
            
            const user = await User.findByPk(req.user.userId);
            
            if (user) {
                // 1. Give XP
                user.xp = (user.xp || 0) + 10;
                xpGained = 10;
                
                // 2. Mark this task as "Paid" 
                todo.isXpGiven = true; 
                
                // 3. Calculate Level (You forgot this part!)
                const calculatedLevel = Math.floor(user.xp / 100) + 1;
                
                if (calculatedLevel > (user.level || 1)) {
                    user.level = calculatedLevel;
                    newLevel = calculatedLevel;
                }

                // 4. Save User Stats
                await user.save();
            }
        }

        // --- PART B: UPDATE THE TASK ---
        if (task !== undefined) todo.task = task; 
        if (completed !== undefined) todo.completed = completed; 

        // Save Todo changes (Text, Status, and isXpGiven)
        await todo.save();
        
        // Send response
        res.json({ message: "Status updated", xpGained, newLevel });

    } catch (error) {
        console.error("Error Update Todo:", error);
        res.status(500).json({ message: "Failed to Update task" });
    }
};


// ==========================================
// 4. DELETE
// ==========================================
const deleteTodo = async (req, res) => {
    try {
        const result = await Todo.destroy({
            where: { id: req.params.id, userId: req.user.userId }
        });

        if (result === 0) {
            return res.status(404).json({ message: "TASK IS NOT FOUND" });
        }

        res.json({ message: "Todo Deleted" });
    } catch (error) {
        console.error("Error Delete Todo:", error);
        res.status(500).json({ message: "FAILED TO DELETE TASK" });
    }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };