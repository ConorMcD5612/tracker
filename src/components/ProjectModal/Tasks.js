import { AddRegularTask } from "./AddRegularTask";

import { Outlet, useLocation } from "react-router-dom";
import { AddSubTask } from "./AddSubTask";

import { React } from "react";
import { Task } from "./Task";

import { useState } from "react";

export const Tasks = ({ tasks, setTasks }) => {
  const [openSubIndex, setOpenSubIndex] = useState(-1);

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
      {tasks?.map((task, index) => (
        <>
          <Task
            task={task}
            index={index}
            openSubIndex={openSubIndex}
            setOpenSubIndex={setOpenSubIndex}
            tasks={tasks}
            setTasks={setTasks}
            color={colorPicker(task.tier)}
          />

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
