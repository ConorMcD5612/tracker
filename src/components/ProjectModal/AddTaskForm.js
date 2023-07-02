import React, { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router";

export const AddTaskForm = ({ setTasks, tasks, ...props }) => {
  const [taskDescription, setTaskDescription] = useState("");

  const params = useParams();

  const taskInput = async (e) => {
    e.preventDefault();

    let newTask = {};

    
    if (props.type == "sub") {
      newTask = {
        id: props.index + 1,
        tier: tasks[props.index].tier + 1,
        description: taskDescription,
      };
    }

    if (props.type == "new") {
      console.log(props.index);
      newTask = {
        tier: 0,
        description: taskDescription,
      };
    }

    await fetch(`http://localhost:5000/projects/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    //onlclick function for addregular and addsub 
    props.onClick();
  };

  return (
    <form className="task-form" onSubmit={(e) => taskInput(e)}>
      <input
        autoFocus
        type="text"
        placeholder="New task..."
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};
