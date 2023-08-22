import React, { useState, useContext } from 'react'
import { TaskContext } from '../context/TaskContext';
import { useParams } from "react-router";
import { useAuth } from '../context/AuthContext';

export const TaskDescription = ({ task }) => {
  const [showInput, setShowInput] = useState(false);
  const [taskDescription, setTaskDescription] = useState(task.description);
  

  const {user} = useAuth()
  
  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();

    let descriptions = {
      oldDescription: task.description,
      updatedDescription: taskDescription,
    };

    let projectName = params.id;
    await fetch(`http://localhost:5000/edit-task/${user}/${projectName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(descriptions), //have to make it an object for some reason??
    });

    setShowInput(false);
  };

  return (
    <>
      {showInput ? (
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            autoFocus
            type="text"
            onBlur={() => setShowInput(false)}
            onChange={(e) => setTaskDescription(e.target.value)}
            name="description"
          />
        </form>
      ) : (
        <span
          style={{ width: `${80 - task.tier * 1.5}%` }}
          onDoubleClick={() => setShowInput(true)}
          className="task-text"
        >
          <h2 className="task-description">
            <span>Task: </span>
            {taskDescription}
          </h2>
        </span>
      )}
    </>
  );
};
