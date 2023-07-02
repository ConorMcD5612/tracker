import React, { useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { Plus } from "react-feather";

export const AddSubTask = ({
  tasks,
  setTasks,
  setIsUpdating,
  openSubIndex,
  setOpenSubIndex,
  ...props
}) => {
  return (
    <div
      style={{ width: `${100 - tasks[props.index].tier * 3}%` }}
      className="add-sub"
    >
      {tasks[props.index] == tasks[openSubIndex] ? (
        <AddTaskForm
          setIsUpdating={setIsUpdating}
          onBlur={() => setOpenSubIndex(-1)}
          onClick={() => setOpenSubIndex(-1)}
          type={props.type}
          index={props.index}
          tasks={tasks}
          setTasks={setTasks}
        />
      ) : null}
    </div>
  );
};
