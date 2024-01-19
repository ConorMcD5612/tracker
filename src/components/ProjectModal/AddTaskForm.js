import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { useParams } from "react-router";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

export const AddTaskForm = ({...props }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const {user} = useAuth()
  const params = useParams();
  const {tasks, setTasks} = useContext(TaskContext)


  const taskInput = async (e) => {
    e.preventDefault();
 
    let newTask = {};
    let tempArr = [...tasks];

    if (props.type == "sub") {
      newTask = {
        id: props.index + 1,
        tier: tasks[props.index].tier + 1,
        description: taskDescription,
        seconds: 0,

   
      };
      console.log(props.index);

      tempArr.splice(props.index + 1, 0, newTask);
      setTasks([...tempArr]);
    }

    if (props.type == "new") {
      console.log(props.index);
      newTask = {
        tier: 0,
        description: taskDescription,
        
      };

      tempArr = [...tasks, newTask];
     setTasks(tempArr);
    }

    await fetch(`https://tracker-rust-seven.vercel.app/projects/${user}/${params.id}`, {
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
