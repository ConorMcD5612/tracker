import React, { useContext } from "react";
import { useParams } from "react-router";
import { Check } from "react-feather";
import { TaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

export const CompleteBtn = ({ task, color, projectInfo, index }) => {
  const params = useParams();
  const {tasks, setTasks} = useContext( TaskContext )

  const {user} = useAuth()

  const completeTask = async () => {
    let projectName = params.id;
    await fetch(`http://localhost:5000/remove-task/${user}/${projectName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    setTasks(tasks.filter((t) => t !== task));
    
  };

  return (
    <button onClick={() => completeTask()} className="complete-btn">
      <div>
        <Check color={color} />
      </div>
    </button>
  );
};
