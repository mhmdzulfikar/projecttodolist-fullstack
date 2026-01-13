import { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../services/api";

export default function useTodo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const data = await getTodos(); // (A)

        const todayDate = new Date().toDateString(); // (B)

        const processedData = await Promise.all(
          data.map(async (task) => { // (C)
            if (task.completed) {
              const lastUpdateDate = new Date(task.updatedAt).toDateString(); // (D)

              if (lastUpdateDate !== todayDate) { // (E)
                await updateTodo(task.id, false); // (F)
                return { ...task, completed: false }; // (G)
              }
            }
            return task; // (H)
          })
        );

        setTasks(processedData);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const addTask = async (text) => {
    const newTask = await addTodo(text);
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = async (id, currentStatus) => {
    await updateTodo(id, !currentStatus);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = async (id) => {
    await deleteTodo(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    removeTask,
  };
}
