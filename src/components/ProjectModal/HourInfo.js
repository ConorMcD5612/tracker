import React, { useState } from 'react'
import { useEffect } from 'react'

export const HourInfo = ({tasks}) => {
    const [{total, daily, weekly}, setHours] = useState({total: 0, daily: 0, weekly: 0});

    useEffect(() => {
      let totalHours = 0;
      tasks.forEach((task) => {
        totalHours += task.seconds;
      });
      totalHours /= 3600;
      totalHours = totalHours.toFixed(1)
      setHours({total: totalHours, weekly: 40, daily: 10});
    }, [tasks]);

  return (
    <div className="hours">
    <h1>Hours spent:</h1>
    <h3>
      <span>Today:</span> 10
    </h3>
    <h3>
      <span>Week:</span> 40
    </h3>
    <h2>
      <span>Total:</span> {total}
    </h2>
  </div>
  )
}
