import React, { useState } from "react";
import { TaskDescription } from "./TaskDescription";
import { TaskBtns } from "./TaskBtns";
import { useEffect } from "react";
import { Task } from "./Task";
import { TaskSeconds } from "./TaskSeconds";
import { Tasks } from "./Tasks";

export const CurrentTask = ({ index, task, color }) => {
  // const [editedTask, setEditedTask] = useState({})
  // useEffect(() => {
  //   let tempTask = task;
  //   tempTask.tier = 0;
  //     setEditedTask(tempTask)

  // }, [])

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
          <TaskBtns index={index} task={task} color={color} />
        </div>
      ) : null}
    </>
  );
};
