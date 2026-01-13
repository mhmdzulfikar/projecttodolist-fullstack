import React from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const TodoItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div 
      className={`group flex items-center justify-between p-4 mb-3 bg-white rounded-2xl border transition-all duration-300 hover:shadow-md
      ${task.completed ? "border-gray-100 bg-gray-50/50" : "border-gray-100 hover:border-indigo-200"}`}
    >
      
      {/* BAGIAN KIRI: Checkbox & Teks */}
      <div 
        className="flex items-center gap-4 flex-1 cursor-pointer" 
        onClick={() => toggleComplete(task.id)}
      >
        {/* Custom Checkbox */}
        <div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300
          ${task.completed 
             ? "bg-indigo-500 border-indigo-500 text-white" 
             : "border-gray-300 text-transparent group-hover:border-indigo-400"}`}
        >
          <FaCheck size={10} />
        </div>

        {/* Teks Task */}
        <span 
          className={`font-medium text-lg transition-all duration-300
          ${task.completed 
             ? "text-gray-400 line-through decoration-gray-300" 
             : "text-gray-700"}`}
        >
          {/* Pastikan property-nya sesuai database, biasanya 'task' */}
          {task.task} 
        </span>
      </div>

      {/* BAGIAN KANAN: Tombol Hapus */}
      <button 
        onClick={(e) => {
           e.stopPropagation(); // Biar pas klik sampah, gak kepanggil toggle
           deleteTask(task.id);
        }} 
        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Delete Task"
      >
        <FaTrash size={16} />
      </button>
    </div>
  );
};

export default TodoItem;