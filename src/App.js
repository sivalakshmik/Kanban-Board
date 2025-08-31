import React, { useContext, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { TaskContext } from "./TaskContext";
import Column from "./components/Column";
import AddTaskForm from "./components/AddTaskForm";
import TaskModal from "./components/TaskModal";

const App = () => {
  const { tasks, moveTask, deleteTask } = useContext(TaskContext);
  const [activeTask, setActiveTask] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;
    const fromColumnId = active?.data?.current?.status;
    const toColumnId = over?.id;
    if (!fromColumnId || !toColumnId) return;
    if (fromColumnId !== toColumnId) {
      moveTask(fromColumnId, toColumnId, active.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
        <h1 className="text-4xl font-bold text-center text-orange-700 mb-10 drop-shadow-sm">
          Kanban Board
        </h1>

        {/* Add Task */}
        <div className="max-w-4xl mx-auto mb-8">
          <AddTaskForm />
        </div>

        {/* Columns */}
        <div className="flex justify-center gap-6 overflow-x-auto px-4">
          <Column
            title="To Do"
            id="to-do"
            tasks={tasks["to-do"]}
            onTaskClick={setActiveTask}
            onDelete={deleteTask}
            color="bg-red-400"
          />
          <Column
            title="In Progress"
            id="in-progress"
            tasks={tasks["in-progress"]}
            onTaskClick={setActiveTask}
            onDelete={deleteTask}
            color="bg-yellow-400"
          />
          <Column
            title="Done"
            id="done"
            tasks={tasks["done"]}
            onTaskClick={setActiveTask}
            onDelete={deleteTask}
            color="bg-green-400"
          />
        </div>

        {activeTask && <TaskModal task={activeTask} onClose={() => setActiveTask(null)} />}
      </div>
    </DndContext>
  );
};

export default App;
