import { AddRegularTask } from "./AddRegularTask";

import { Outlet, useLocation } from "react-router-dom";
import { AddSubTask } from "./AddSubTask";
import { useParams } from "react-router-dom";
import { React, useEffect } from "react";
import { Task } from "./Task";
import { useState } from "react";
import { TaskContext } from "../context/TaskContext";

export const Tasks = () => {
  const [openSubIndex, setOpenSubIndex] = useState(-1);

  const [tasks, setTasks] = useState([]);

  const taskData = {
    tasks,
    setTasks,
  };

  const params = useParams()
  useEffect(() => {
    fetch(`http://localhost:5000/projects/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  }, [tasks.length]);

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
    <TaskContext.Provider value={taskData}>
      {tasks?.map((task, index) => (
        <>
          <Task
            task={task}
            index={index}
            openSubIndex={openSubIndex}
            setOpenSubIndex={setOpenSubIndex}
            color={colorPicker(task.tier)}
          />

          <AddSubTask
            type="sub"
            task={task}
            index={index}
            setOpenSubIndex={setOpenSubIndex}
            openSubIndex={openSubIndex}
          />
          <Outlet />
        </>
      ))}
      <AddRegularTask type="new" />
    </TaskContext.Provider>
  );
};
