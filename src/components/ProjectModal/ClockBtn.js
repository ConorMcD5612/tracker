import React from "react";
import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Clock } from "react-feather";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ClockBtn = ({ index, color }) => {
  const location = useLocation();
 
  const params = useParams()

  const {user} = useAuth()

  const setCurrentTask = async () => {
    const projectName = params.id
    await fetch(`http://localhost:5000/${user}/${projectName}/set-current-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({index: index}),
      });
      console.log("called", index)
  };

  return (
  
      <Link
        to={`timer/task/${index}`}
        state={{ background: location, index: index }}
      >
        <Clock color={color} onClick={() => setCurrentTask()} />
      </Link>
  
  );
};
