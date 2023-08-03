import React from "react";
import { TaskDescription } from "./TaskDescription";
import { TaskBtns } from "./TaskBtns";
import { TaskSeconds } from "./TaskSeconds";

export const Task = ({
  task,
  index,
  setOpenSubIndex,
  color,
  setCurrentTask,
  projectInfo,
}) => {
  return (
    <div
      style={{
        width: `${100 - task.tier * 1.5}%`,
        border: `.15vw solid ${color}`,
      }}
      className="task"
    >
      <TaskDescription task={task} />
      <TaskSeconds task={task} />
      <TaskBtns
        task={task}
        index={index}
        setOpenSubIndex={setOpenSubIndex}
        setCurrentTask={setCurrentTask}
        color={color}
        projectInfo={projectInfo}
      />
    </div>
  );
};
