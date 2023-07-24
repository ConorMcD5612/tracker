import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useEffect } from "react";

export const HourInfo = ({ projectInfo }) => {
  const [{ total, daily, weekly }, setHours] = useState({
    total: 0,
    daily: 0,
    weekly: 0,
  });

  const { tasks } = useContext(TaskContext);

  const toHours = (seconds) => {
    seconds /= 3600;
    return seconds.toFixed(2);
  };

  useEffect(() => {
    let tempTotal = 0;
    tasks.forEach((task) => {
      tempTotal += task.seconds;
    });

    setHours({
      total: toHours(tempTotal),
      daily: toHours(projectInfo.daily),
      weekly: toHours(projectInfo.weekly),
    });
  }, [tasks]);

  return (
    <div className="hours">
      <h1>Hours spent:</h1>
      <h3>
        <span>Today:</span> {daily} 
      </h3>
      <h3>
        <span>Week:</span> {weekly}
      </h3>
      <h2>
        <span>Total:</span> {total}
      </h2>
    </div>
  );
};
