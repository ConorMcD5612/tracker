import React, {useContext} from 'react'
import { ChevronDown, Clock } from "react-feather";
import { Plus } from "react-feather";
import { CompleteBtn } from "./CompleteBtn";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TaskContext } from '../context/TaskContext';

export const TaskBtns = ({task, index, setOpenSubIndex, color}) => {
    const location = useLocation();
    const {tasks } = useContext(TaskContext)

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
        <CompleteBtn color={color} task={task} />
      </>
    )}
    <Plus onClick={() => setOpenSubIndex(index)} color={color} />
    <ChevronDown color={color} />
  </div>
  )
}
