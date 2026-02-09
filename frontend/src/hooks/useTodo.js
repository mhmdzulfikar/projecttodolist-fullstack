import { useEffect, useState } from "react";
import { todoService } from "../services/todoServices";
import { authService } from "../services/authService";

export default function useTodo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userStats, setUserStats] = useState({ 
      xp: 0, 
      level: 1 
  });

  // 1. FIRST LOAD DATA 
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const data = await todoService.getAll(); 
        if (Array.isArray(data)) {
            setTasks(data);
        } else {
            setTasks([]); 
        }

        const userData = await authService.getMe();

        console.log("First Data User:", userData); // Debugging.

        setUserStats({
            xp: userData || 0,
            level: userData.level || 1,
            name: userData.name
        });

      } catch (err) {
        console.error("Failed to load data", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // 2. FUNCTION ADD
 const addTask = async (text) => {
    // debugger; // eslint-disable-line no-debugger
    try {
        const newTask = await todoService.create({ task: text });
        setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
        console.error("Ada error nih:", err);
    }
};


  // 3. FUNGSI TOGGLE
 // File: src/hooks/useTodo.js

const toggleTask = async (id, currentStatus) => {
    try {
        // 1. Optimistic Update (Biar checklist UI cepet)
        setTasks((prev) => prev.map((t) => 
            t.id === id ? { ...t, completed: !t.completed } : t
        ));

        // 2. Panggil Backend
        const response = await todoService.updateStatus(id, { completed: !currentStatus });

        // 3. Ambil data bersih (Jaga-jaga kalau ada di response.data)
        const dataBackend = response.data || response;

        console.log("📦 Data dari Backend:", dataBackend); // Debugging
        // Kalau backend bilang "Ada XP nambah", kita langsung update wadah userStats
        if (dataBackend.xpGained > 0) {
            
            setUserStats(prevStats => ({
                ...prevStats, // Pertahankan data lama (nama, email, dll)
                xp: (prevStats.xp || 0) + dataBackend.xpGained, // Tambah XP
                level: dataBackend.newLevel || prevStats.level   // Update Level kalau naik
            }));
            
            console.log("✨ Frontend Updated: XP Nambah!");
        }

    } catch (err) {
        console.error("❌ Error toggle:", err);
        // Rollback kalau gagal (Balikin checklist ke semula)
        setTasks((prev) => prev.map((t) => 
            t.id === id ? { ...t, completed: currentStatus } : t
        ));
    }
};

  // 4. FUNGSI EDIT (Code Baru)
  const editTask = async (id, newText) => {
    try {
        // A. Optimistic Update (Layar berubah duluan)
        setTasks((prev) => prev.map((t) => 
            // Cari ID-nya, ganti properti 'task' dengan teks baru
            t.id === id ? { ...t, task: newText } : t
        ));

        // B. Kirim ke Backend
        // Kita pake fungsi updateTodo yang sama, tapi isinya beda
        await todoService.updateStatus(id, { task: newText }); 
    } catch (err) {
        console.error("Gagal edit:", err);
    }
  };

  // 4. FUNGSI REMOVE
  const removeTask = async (id) => {
    const oldTask = [...tasks];
    try {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        await todoService.delete(id);

    } catch (err) {
        console.error(err);

        setTasks(oldTask);

        alert("Failed to delete the task. Check your Internet connection.")
    }
  };

  // Return these 'Tools' to TodoList.jsx
  return {
    tasks,
    loading,
    userStats,
    addTask,
    toggleTask,
    removeTask,
    editTask,
  };
}