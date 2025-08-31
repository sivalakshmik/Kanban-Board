import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

function Column({ id, title, tasks = [], onTaskClick, onDelete, color }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="w-80 bg-white rounded-2xl shadow-md flex flex-col"
    >
      <div className={`p-4 rounded-t-2xl ${color} text-white font-bold text-lg`}>
        {title}
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[70vh]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              status={id}
              onClick={onTaskClick}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-400 italic text-center mt-6">No tasks</p>
        )}
      </div>
    </div>
  );
}

export default Column;
