import React, { useContext } from "react";
import { ChevronDown } from "react-feather";
import { Plus } from "react-feather";
import { CompleteBtn } from "./CompleteBtn";

import { TaskContext } from "../context/TaskContext";
import { ClockBtn } from "./ClockBtn";

export const TaskBtns = ({
  task,
  index,
  setOpenSubIndex,
  color,
  setCurrentTask,
}) => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="task-buttons">
      {tasks[index + 1]?.tier > task.tier ? null : (
        <>
        <ClockBtn index={index} color={color} task={task} />
          <CompleteBtn color={color} task={task} />
          
        </>
      )}
  
 
      <Plus onClick={() => setOpenSubIndex(index)} color={color} />
      <ChevronDown color={color} />
   
    </div>
  );
};
