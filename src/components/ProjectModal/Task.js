import React from "react";




import { TaskDescription } from "./TaskDescription";


import { TaskBtns } from "./TaskBtns";

export const Task = ({ task, index, setTasks, tasks, setOpenSubIndex, color }) => {


  const secToHours = (seconds) => {
    seconds /= 3600;
    return seconds.toFixed(1).padStart(4, "0");
  };

  return (
    <div
      style={{
        width: `${100 - task.tier * 1.5}%`,
        border: `.15vw solid ${color}`,
      }}
      className="task"
    >
      <TaskDescription task={task} tasks={tasks} setTasks={setTasks} />
      <h2 className="task-seconds">
        <span>Hours: </span>
        {secToHours(task.seconds)}
      </h2>
      <TaskBtns task={task} tasks={tasks} setTasks={setTasks} index={index} setOpenSubIndex={setOpenSubIndex} color={color}  />
    </div>
  );
};
