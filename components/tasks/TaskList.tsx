"use client";
import { Task } from "@/domain/entities/Task";
import React from "react";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <ul className="space-y-4 h-72 overflow-y-auto">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
        >
         <TaskCard task={task} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
