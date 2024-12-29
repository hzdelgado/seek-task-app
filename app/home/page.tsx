"use client";

import Header from "@/components/Header";
import TaskContainer from "@/components/tasks/TaskContainer";

const HomePage = () => {

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 bg-gray-100 dark:bg-slate-600">
        <Header />
        <TaskContainer/>
      </div>
    </div>
  );
};

export default HomePage;