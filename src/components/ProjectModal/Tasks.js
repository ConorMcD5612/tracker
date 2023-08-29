import { AddRegularTask } from "./AddRegularTask";

import { Outlet, useLocation } from "react-router-dom";
import { AddSubTask } from "./AddSubTask";
import { useParams } from "react-router-dom";
import { React, useEffect } from "react";
import { Task } from "./Task";
import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { CurrentTask } from "./CurrentTask";

export const Tasks = ({projectInfo}) => {
  const [openSubIndex, setOpenSubIndex] = useState(-1);

  const { tasks } = useContext(TaskContext);

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    console.log(tasks)
  })

  const [currentTask, setCurrentTask] = useState(0);

  const colors = ["#FA3BF0", "#FBF719", "#24e2e8df"];

  const colorPicker = (tier) => {
    tier++;
    // tier 3 6 9 12
    if (tier % 3 == 0) {
      return colors[0];
    }

    //tier 2
    if (tier % 2 == 0) {
      return colors[1];
    }

    if (tier % 1 == 0) {
      return colors[2];
    }
  };

  return (
    <>
      <CurrentTask task={tasks[projectInfo.currentTask]} index={projectInfo.currentTask} color={colorPicker(0)}/>
      {tasks?.map((task, index) => (
        <>
          <Task
            task={task}
            index={index}
            key={Date.now()}
            openSubIndex={openSubIndex}
            setOpenSubIndex={setOpenSubIndex}
            color={colorPicker(task.tier)}
            setCurrentTask={setCurrentTask}
            projectInfo={projectInfo}
          />

          <AddSubTask
            type="sub"
            task={task}
            index={index}
            setOpenSubIndex={setOpenSubIndex}
            openSubIndex={openSubIndex}
          />
          
    
        </>
      ))}
      <AddRegularTask type="new" />
    </>
  );
};
