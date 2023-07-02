import React from "react";
import { Project } from "./Project";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import "./projectStyles.scss";

export const ProjectSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/projects/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, [projects.length]);

  return (
    <div className="project-container">
      <div className="project-section">
        <header className="project-header">
          <h1>Projects:</h1>
        </header>

        <div className="list-group">
          {projects?.map((project, index) => (
            <Project key={index} name={project.name} hours={project.hours} />
          ))}

          <div className="add-project-btn">
            <Link to="/add-project">
              <Plus color="#24e2e8df" />
            </Link>
          </div>
        </div>
      </div>

      <div className="stats">
        <h2>Stats go here</h2>
      </div>

      <div />
    </div>
  );
};
