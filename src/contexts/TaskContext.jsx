import { createContext, useState, useEffect, useContext, useMemo } from "react";
// import { AuthContext } from "./AuthContext";
import { useSelector } from "react-redux";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // const { login } = useContext(AuthContext);
  const login = useSelector((state) => state.auth.login);

  const [tasks, setTasks] = useState(() => {
    const allTasks = JSON.parse(localStorage.getItem("ALL_TASKS")) || [];
    if (!login) return [];
    return allTasks.filter((t) => t.userId === login.id);
  });
  const [value, setValue] = useState("");
  const [editTask, setEditTask] = useState(null);

  // Load tasks for the current user on login
  useEffect(() => {
    if (!login) {
      setTasks([]);
      return;
    }
    const allTasks = JSON.parse(localStorage.getItem("ALL_TASKS")) || [];
    const userTasks = allTasks.filter((t) => t.userId === login.id);
    setTasks(userTasks);
  }, [login]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!login) return;

    const allTasks = JSON.parse(localStorage.getItem("ALL_TASKS")) || [];
    const otherUsersTasks = allTasks.filter((t) => t.userId !== login.id);

    const newAllTasks = [...otherUsersTasks, ...tasks];
    localStorage.setItem("ALL_TASKS", JSON.stringify(newAllTasks));
  }, [tasks, login]);

  // Helper function to update a task by id
  const updateTask = (id, newData) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...newData } : t)));
  };

  // Task operations
  const addTask = () => {
    if (!value.trim() || !login) return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), value, status: "pending", userId: login.id },
    ]);
    setValue("");
  };
  const handleCompleted = (id) => updateTask(id, { status: "completed" });
  const handleRedo = (id) => updateTask(id, { status: "pending" });
  const handleDelete = (id) => updateTask(id, { status: "deleted" });

  // Edit modal operations
  const editOpen = (id) => {
    const task = tasks.find((t) => t.id === id);
    setEditTask(task);
  };
  const editClose = () => setEditTask(null);
  const handleEdit = (id) => {
    updateTask(id, { value });
    setValue("");
    editClose();
  };

  // -------------------
  // Memoize context value
  // -------------------
  const contextValue = useMemo(
    () => ({
      tasks,
      value,
      setValue,
      addTask,
      handleCompleted,
      handleRedo,
      handleDelete,
      editOpen,
      editClose,
      editTask,
      handleEdit,
    }),
    [tasks, value, editTask] // only re-create when these states change
  );

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};
