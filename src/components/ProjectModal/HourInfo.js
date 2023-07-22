import React, { useState, useContext } from 'react'
import { TaskContext } from '../context/TaskContext';
import { useEffect } from 'react'



export const HourInfo = () => {
    const [{total, daily, weekly}, setHours] = useState({total: 0, daily: 0, weekly: 0});

    const tasks = useContext(TaskContext)
  
    

    useEffect(() => {
      let currDate = new Date()
      
      currDate = `${currDate.secUpdated.getDate()}/${currDate.secUpdated.getMonth() + 1}/${currDate.secUpdated.getFullYear()}`
      
      let tempTotal = 0, tempDaily = 0, tempWeekly = 0
      tasks.forEach((task) => {
        let taskDate = `${task.secUpdated.getDate()}/${task.secUpdated.getMonth() + 1}/${task.secUpdated.getFullYear()}`
        //if today
        if(currDate == taskDate) {
          tempDaily += task.seconds
        }
        //if during this week
        if(currDate.slice(0, 1) == taskDate.slice(0, 1) && currDate.slice(-1,1) == taskDate.slice(-1, 1)){
  
        }
      })
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
      <span>Total:</span> 30
    </h2>
  </div>
  )
}
