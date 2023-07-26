import React from 'react'

export const TaskSeconds = ({task}) => {

    const secToHours = (seconds) => {
        seconds /= 3600;
        return seconds.toFixed(1).padStart(4, "0");
      };
      
  return (
    <h2 className="task-seconds">
    <span>Hours: </span>
    {secToHours(task.seconds)}
  </h2>
  )
}
