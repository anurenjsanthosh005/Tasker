import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("TASKS")) || []);
  const [value, setValue] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // -------------------
  // Helper functions
  // -------------------
  const updateTask = (id, newData) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...newData } : t)));
  };

  // -------------------
  // Task operations
  // -------------------
  const addTask = () => {
    if (!value.trim()) return;

    setTasks(prev => [...prev, { id: Date.now(), value, status: "pending" }]);
    setValue("");
    handleEditClose();
  };

  const editTask = (id) => {
    updateTask(id, { value });
    setValue("");
    handleEditClose();
  };

  const handleCompleted = (id) => updateTask(id, { status: "completed" });
  const handleRedo = (id) => updateTask(id, { status: "pending" });
  const handleDelete = (id) => updateTask(id, { status: "deleted" });

  // -------------------
  // Edit modal
  // -------------------
  const handleEditOpen = (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setEditOpen(true);
    }
  };

  const handleEditClose = () => setEditOpen(false);

  // -------------------
  // Persist tasks
  // -------------------
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        value,
        setValue,
        addTask,
        editTask,
        handleCompleted,
        handleRedo,
        handleDelete,
        editOpen,
        editingTask,
        handleEditOpen,
        handleEditClose,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
