import { AddRegularTask } from "./AddRegularTask";
import { CompleteBtn } from "./CompleteBtn";

import { ChevronDown, Clock } from "react-feather";
import { TaskDescription } from "./TaskDescription";
import { Outlet, useLocation } from "react-router-dom";
import { AddSubTask } from "./AddSubTask";
import { Plus } from "react-feather";
import { React } from "react";

import { Link } from "react-router-dom";
import { useState } from "react";

export const Tasks = ({ tasks, setTasks }) => {
  const [openSubIndex, setOpenSubIndex] = useState(-1);

  const location = useLocation();

  const colors = ["#FA3BF0","#FBF719","#24e2e8df"]

  
  const colorPicker = (tier) => {
    tier++;
    // tier 3 6 9 12
    if(tier % 3 == 0) {
      return colors[0]
    }

    //tier 2 
    if(tier % 2 == 0) {
      return colors[1]
    }

    if(tier % 1 == 0) {
      return colors[2]
    }
  
  }

  return (
    <>
      {tasks?.map((task, index) => (
        <>
          
          <div style={{ width: `${100 - task.tier * 1.5}%`, border: `.15vw solid ${colorPicker(task.tier)}` }} className="task">
         
            <TaskDescription task={task} tasks={tasks} setTasks={setTasks} />
            <h2 className="task-seconds">
              <span>Hours: </span>
              {task.seconds?.toFixed(1).padStart(4, "0")}
            </h2>
            <div className="task-buttons">
              {tasks[index + 1]?.tier > task.tier ? null : (
                <>
                  <Link
                    to={`timer/task/${index}`}
                    state={{ background: location, index: index }}
                  >
                    <Clock color="#24e2e8df" />
                  </Link>
                  <CompleteBtn task={task} tasks={tasks} setTasks={setTasks} />
                </>
              )}
              <Plus onClick={() => setOpenSubIndex(index)} color="#24e2e8df" />
              <ChevronDown color="#24e2e8df" />
            </div>
          </div>
         
          <AddSubTask
            type="sub"
            task={task}
            index={index}
            setTasks={setTasks}
            tasks={tasks}
            setOpenSubIndex={setOpenSubIndex}
            openSubIndex={openSubIndex}
          />
          <Outlet />
        </>
      ))}
      <AddRegularTask type="new" tasks={tasks} setTasks={setTasks} />
    </>
  );
};
