import React, { useState } from "react";
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes } from "react-icons/fa";

// Kita gak butuh import todoService di sini, karena logic update ada di Parent (lewat props editTask)
// import { todoService } from "../../services/todoServices"; <--- HAPUS

const TodoItem = ({ task, toggleComplete, editTask, deleteTask }) => {
  // 1. STATE CUKUP 2 INI AJA (Buat Inline Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.task);

  //  2. LOGIC TOMBOL EDIT DITEKAN
  const handleEditClick = (e) => {
    e.stopPropagation(); 
    setIsEditing(true); // Cukup nyalain mode edit
    setNewText(task.task); // Reset teks sesuai data asli
  };

  //  3. LOGIC SIMPAN (Panggil fungsi dari Parent)
  const handleSave = (e) => {
    e.stopPropagation();
    if (newText.trim()) {
      // Panggil props 'editTask' yang dikirim dari Parent
      editTask(task.id, newText); 
      setIsEditing(false); // Tutup mode edit
    }
  };

  // ✅ 4. LOGIC CANCEL
  const handleCancel = (e) => {
    e.stopPropagation();
    setNewText(task.task); // Balikin teks ke semula
    setIsEditing(false);
  };

  return (
    <div 
      className={`group flex items-center justify-between p-4 mb-3 bg-white rounded-2xl border transition-all duration-300 hover:shadow-md
      ${task.completed ? "border-gray-100 bg-gray-50/50" : "border-gray-100 hover:border-indigo-200"}`}
    >
      
      {/* --- LOGIC TAMPILAN --- */}
      
      {isEditing ? (
        // A. KALAU LAGI MODE EDIT
        <div className="flex items-center gap-2 flex-1 w-full animate-fade-in">
            <input 
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="flex-1 bg-gray-50 border border-indigo-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                autoFocus
                onClick={(e) => e.stopPropagation()} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(e);
                    if (e.key === 'Escape') handleCancel(e);
                }}
            />
            {/* Tombol Save */}
            <button onClick={handleSave} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                <FaSave size={16} />
            </button>
            {/* Tombol Cancel */}
            <button onClick={handleCancel} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <FaTimes size={16} />
            </button>
        </div>

      ) : (
        // B. KALAU MODE BIASA
        <>
          <div 
            className="flex items-center gap-4 flex-1 cursor-pointer" 
            onClick={() => toggleComplete(task.id)}
          >
            {/* Checkbox */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${task.completed ? "bg-indigo-500 border-indigo-500 text-white" : "border-gray-300 text-transparent group-hover:border-indigo-400"}`}>
              <FaCheck size={10} />
            </div>

            {/* Teks Task */}
            <span className={`font-medium text-lg transition-all duration-300 ${task.completed ? "text-gray-400 line-through decoration-gray-300" : "text-gray-700"}`}>
              {task.task} 
            </span>
          </div>
          

          {/* Tombol Aksi */}
          <div className="flex items-center gap-1">
             <button
                onClick={handleEditClick}
                className="p-2 text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
             >
                <FaEdit size={16} />
             </button>

             <button 
                onClick={(e) => {
                   e.stopPropagation();
                   deleteTask(task.id);
                }} 
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
             >
                <FaTrash size={16} />
             </button>
          </div>
        </>
      )}

    </div>
  );
};

export default TodoItem;