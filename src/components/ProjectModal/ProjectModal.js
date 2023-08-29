import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Tasks } from "./Tasks";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "react-feather";
import { HourInfo } from "./HourInfo";
import { TaskContext } from "../context/TaskContext";
import "./taskStyles.scss";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router";


export const ProjectModal = () => {
  
  const [projectInfo, setProjectInfo] = useState({});
  const [tasks, setTasks] = useState([]);


  const taskData = {
    tasks,
    setTasks,
  };
  const location = useLocation()

  const { user } = useAuth()
  const params = useParams()


  useEffect(() => {
    fetch(`http://localhost:5000/projects/${user}/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(location)
        console.log(location.state.index)
        setTasks(data.projects[location.state.index].tasks);
        setProjectInfo(data)
      });
  }, [tasks.length]);


  
  const capitlize = (text) => {
    const str = text.charAt(0).toUpperCase() + text.slice(1);
    return str;
  };

  return (
    <TaskContext.Provider value={taskData}>
    <div className="task-page-container">
      <div className="project-info">
        <header>
          <h1>{capitlize(params.id)}</h1>
        </header>

        <HourInfo projectInfo={projectInfo} />

        <p className="project-description">
          <h1>Description:</h1>
          {projectInfo.description}
        </p>

        <div className="project-info-buttons">
          <Link to="/projects">
            <ArrowLeft color="#24e2e8df" size={32} />
          </Link>
          <Settings color="#24e2e8df" size={32} />
        </div>
      </div>

      <div></div>
      <div className="tasks-padding">
        <div className="tasks-container">
          <Tasks projectInfo={projectInfo}/>
        </div>
      </div>
    </div>
</TaskContext.Provider>
  );
};
