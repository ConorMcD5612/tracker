import React from 'react'
import { ChevronDown, Clock } from "react-feather";
import { Plus } from "react-feather";
import { CompleteBtn } from "./CompleteBtn";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const TaskBtns = ({task, tasks, index, setOpenSubIndex, setTasks, color}) => {
    const location = useLocation();

  return (
    <div className="task-buttons">
    {tasks[index + 1]?.tier > task.tier ? null : (
      <>
        <Link
          to={`timer/task/${index}`}
          state={{ background: location, index: index }}
        >
          <Clock color={color} />
        </Link>
        <CompleteBtn color={color} task={task} tasks={tasks} setTasks={setTasks} />
      </>
    )}
    <Plus onClick={() => setOpenSubIndex(index)} color={color} />
    <ChevronDown color={color} />
  </div>
  )
}
