import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Tasks } from "./Tasks";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "react-feather";
import { HourInfo } from "./HourInfo";
import { TaskContext } from "../context/TaskContext";
import "./taskStyles.scss";

export const ProjectModal = () => {
  
  const [projectInfo, setProjectInfo] = useState({});
  

  const params = useParams();
  
  const capitlize = (text) => {
    const str = text.charAt(0).toUpperCase() + text.slice(1);
    return str;
  };

  return (
  
    <div className="task-page-container">
      <div className="project-info">
        <header>
          <h1>{capitlize(params.id)}</h1>
        </header>

        <HourInfo />

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
          <div className="current-task">
            <h2>
              {/*Make task componenet so I can just use it here and tasks  */}
              <span>Current: </span>go to grocery store otherwise
            </h2>
          </div>
          <Tasks />
        </div>
      </div>
    </div>

  );
};
