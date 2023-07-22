import React, {useContext } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { TaskContext } from "../context/TaskContext";

export const AddSubTask = ({
  openSubIndex,
  setOpenSubIndex,
  ...props
}) => {

  const {tasks} = useContext(TaskContext)

  return (
    <div
      style={{ width: `${100 - tasks[props.index].tier * 3}%` }}
      className="add-sub"
    >
      {tasks[props.index] == tasks[openSubIndex] ? (
        <AddTaskForm
          
          onBlur={() => setOpenSubIndex(-1)}
          onClick={() => setOpenSubIndex(-1)}
          type={props.type}
          index={props.index}
        />
      ) : null}
    </div>
  );
};
