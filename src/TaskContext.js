import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    "to-do": [],
    "in-progress": [],
    "done": [],
  });

  // Add task
  const addTask = (status, title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status,
    };
    setTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], newTask],
    }));
  };

  // Delete task
  const deleteTask = (status, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [status]: prev[status].filter((task) => task.id !== taskId),
    }));
  };

  // Move task (for drag & drop)
  const moveTask = (fromStatus, toStatus, taskId) => {
    setTasks((prev) => {
      if (!prev[fromStatus] || !prev[toStatus]) return prev;

      const taskToMove = prev[fromStatus].find((t) => t.id === taskId);
      if (!taskToMove) return prev;

      return {
        ...prev,
        [fromStatus]: prev[fromStatus].filter((t) => t.id !== taskId),
        [toStatus]: [...prev[toStatus], { ...taskToMove, status: toStatus }],
      };
    });
  };

  // Update task (for edit modal)
  const updateTask = (status, taskId, updatedFields) => {
    setTasks((prev) => ({
      ...prev,
      [status]: prev[status].map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      ),
    }));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, moveTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
