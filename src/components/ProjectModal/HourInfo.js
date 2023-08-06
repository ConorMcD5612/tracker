import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useEffect } from "react";

export const HourInfo = ({ projectInfo }) => {
  
  const toHours = (seconds) => {
    seconds /= 3600;
    return seconds.toFixed(2);
  };

  return (
    <div className="hours">
      <h1>Hours spent:</h1>
      <h3>
        <span>Today:</span> {toHours(projectInfo.daily)}
      </h3>
      <h3>
        <span>Week:</span> {toHours(projectInfo.weekly)}
      </h3>
      <h2>
        <span>Total:</span> {toHours(projectInfo.total)}
      </h2>
    </div>
  );
};
