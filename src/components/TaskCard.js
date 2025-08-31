import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { BiPencil, BiTrash } from "react-icons/bi";

const TaskCard = ({ task, status, onClick, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { status },
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex justify-between items-start hover:shadow-md transition-all duration-200"
    >
      {/* Task content */}
      <div
        className="flex-1 cursor-pointer pr-3"
        onClick={() => onClick(task)}
      >
        <h3 className="font-semibold text-gray-800 text-lg leading-tight">
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* Actions + drag handle */}
      <div className="flex items-center space-x-2">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClick(task);
          }}
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          title="Edit"
        >
          <BiPencil className="w-5 h-5" />
        </button>

        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(status, task.id);
          }}
          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
          title="Delete"
        >
          <BiTrash className="w-5 h-5" />
        </button>

        <div
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab select-none px-2 py-1 rounded-md bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          title="Drag"
        >
          ≡
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

