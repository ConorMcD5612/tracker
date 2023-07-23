import React, { useState, useContext } from 'react'
import { TaskContext } from '../context/TaskContext';
import { useEffect } from 'react'



export const HourInfo = () => {
    const [{total, daily, weekly}, setHours] = useState({total: 0, daily: 0, weekly: 0});

    const { tasks } = useContext(TaskContext)
  
    

    useEffect(() => {
      let currDate = new Date()
      let day = currDate.getDay()
      //need to change it so its based on time zone 
      currDate = currDate.toISOString().slice(0, 10)

      let sunday = parseInt(currDate.slice(-2)) - (6 - day)
      console.log(sunday)
    
      
      
      
      let tempTotal = 0, tempDaily = 0, tempWeekly = 0
    
      tasks.forEach((task) => {
      
        if(task.secUpdated){
          //YYYY-MM-DD
         let taskDate = task.secUpdated.slice(0, 10)
     
        
        if(currDate == taskDate) {
          tempDaily += task.seconds
        }
       
        //if year and month are the same 
        if(currDate.slice(0, 4) == taskDate.slice(0, 4) && 
        currDate.slice(5, 7) == taskDate.slice(5, 7)){
          let taskDay = parseInt(taskDate.slice(-2))
          console.log(taskDay)
          if(taskDay >= sunday ){
            console.log("DOES NOT GET HERE")
            tempWeekly += task.seconds
          }
          
        }

      }
      tempTotal += task.seconds
      })

      console.log(tempTotal, tempDaily, tempWeekly)
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
