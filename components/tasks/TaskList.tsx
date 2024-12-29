"use client";
import { Task } from "@/domain/entities/Task";
import React, { useState } from "react";
import TextInput from "../input/TextInput";
import BaseButton from "../button/BaseButton";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <ul className="space-y-4 h-72 overflow-y-auto">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
        >
          {!editMode ? (
            <div className="flex flex-wrap w-full gap-y-4">
              <div className="flex flex-wrap w-full">
                <div className="flex flex-col">
                  <span className="grow text-lg">{task.title}</span>
                  <span className="grow text-md text-slate-500">
                    {task.description}
                  </span>
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <BaseButton onClick={() => setEditMode(true)}>
                  Editar
                </BaseButton>
                <BaseButton isOutline={true} onClick={() => onDelete(task.id)}>
                  Borrar
                </BaseButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap w-full gap-x-4">
              <div className="flex flex-wrap w-full">
                <div className="flex flex-col w-full">
                  <TextInput
                    type="text"
                    placeholder="Edita el titulo"
                    value={task.title}
                    testId={"title" + task.id}
                    onChange={() => {}}
                  />
                  <TextInput
                    type="text"
                    placeholder="Edita la descripción"
                    value={task.description}
                    testId={"description" + task.id}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex gap-x-4 w-full">
                  <BaseButton onClick={() => onEdit(task)}>Guardar</BaseButton>
                  <BaseButton
                    isOutline={true}
                    onClick={() => setEditMode(false)}
                  >
                    Cancelar
                  </BaseButton>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
