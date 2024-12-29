import React, { useEffect, useState } from "react";
import { Task, TaskStatus } from "@/domain/entities/Task";
import BaseButton from "../button/BaseButton";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import { plainToInstance } from "class-transformer";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const options = [
  { value: "toDo", label: "POR HACER" },
  { value: "inProgress", label: "EN PROGRESO" },
  { value: "done", label: "COMPLETADA" },
];

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status as string);
  const [taskObject, setTaskObject] = useState(plainToInstance(Task, task));

  useEffect(() => {
    setTaskObject(plainToInstance(Task, task))
    setSelectedStatus(task.status)
  }, [task]);

  
  return !editMode ? (
    <div className="flex flex-wrap w-full gap-y-4">
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col">
          <span className="grow text-lg">{taskObject.title}</span>
          <span className="grow text-md text-slate-500">
            {taskObject.description}
          </span>
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            { taskObject.getStatus()}
          </span>
        </div>
      </div>
      <div className="flex gap-x-4 w-full">
        <BaseButton onClick={() => setEditMode(true)}>Editar</BaseButton>
        <BaseButton isOutline={true} onClick={() => onDelete(taskObject.id)}>
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
            value={taskObject.title}
            testId={"title" + taskObject.id}
            onChange={() => {}}
          />
          <TextInput
            type="text"
            placeholder="Edita la descripción"
            value={taskObject.description}
            testId={"description" + taskObject.id}
            onChange={() => {}}
          />
          <SelectInput
            testId="select-input"
            options={options}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
        <div className="flex gap-x-4 w-full">
          <BaseButton onClick={() => onEdit(taskObject)}>Guardar</BaseButton>
          <BaseButton isOutline={true} onClick={() => setEditMode(false)}>
            Cancelar
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
