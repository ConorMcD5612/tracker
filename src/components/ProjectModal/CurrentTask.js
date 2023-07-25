import React, {useState} from 'react'
import { TaskDescription } from './TaskDescription'
import { TaskBtns } from './TaskBtns'
import { useEffect } from 'react'
import { Task } from './Task'

export const CurrentTask = ({index, task, color}) => {
  // const [editedTask, setEditedTask] = useState({})
  // useEffect(() => {
  //   let tempTask = task;
  //   tempTask.tier = 0;
  //     setEditedTask(tempTask)

  // }, [])
  
  return (
   
    <div style={{width: "100%", }}>

        {task ? <Task index={index} task={task} color={color}/> : null}
    </div>
  

  )
}
