"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  updateTask,
} from "@/infrastructure/adapters/redux/taskSlice";
import { Task, TaskStatus } from "@/domain/entities/Task";
import { AppDispatch, RootState } from "@/infrastructure/adapters/redux/store";
import TaskList from "./TaskList";
import {
  addTask,
  fetchTasks,
} from "@/infrastructure/adapters/redux/taskThunks";
import TextInput from "../input/TextInput";
import BaseButton from "../button/BaseButton";

const TaskContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    const newTask = { title: title, description: description };
    dispatch(addTask(newTask as Task));
  };

  const handleEditTask = (task: Task) => {
    //dispatch(updateTask(task));
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 scroll-smooth">
      <h2 className="text-3xl font-bold text-center mb-6">Listado de Tareas</h2>
      <div className="flex flex-wrap md:flex-row mb-4 gap-x-4 items-center">
        <TextInput
          label="Título"
          type="text"
          placeholder="Ingresa un nombre"
          value={title}
          testId="title"
          onChange={setTitle}
        />
        <TextInput
          label="Descripción"
          type="text"
          placeholder="Ingresa una descripción"
          value={description}
          testId="description"
          onChange={setDescription}
        />
        <BaseButton
          onClick={() => handleAddTask}
        >
          Agregar
        </BaseButton>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskContainer;
