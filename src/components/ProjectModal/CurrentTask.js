import React, { useState } from "react";
import { TaskDescription } from "./TaskDescription";
import { TaskBtns } from "./TaskBtns";
import { useEffect } from "react";
import { Task } from "./Task";
import { TaskSeconds } from "./TaskSeconds";
import { Tasks } from "./Tasks";
import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export const CurrentTask = ({task, index, color}) => {
  //currentTask is set in clockBtn (when user clicks clockbtn)
  

  const { tasks } = useContext(TaskContext)

  

  return (
    <>
      {task ? (
        <div
        style={{
          border: `.15vw solid ${color}`,
        }}
        className="task current-task"
      >
            <h2 style={{width: "80%"}} className="task-description">
            <span style={{color: `${color}`}}>Current Task: </span>
            {task.description}
          </h2>
          <TaskSeconds  task={task} />
          <TaskBtns index={index} task={task}  />
        </div>
      ) : null}
    </>
  );
};
