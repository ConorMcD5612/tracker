import React, { useState, useEffect } from 'react'
import { AddTaskForm } from './AddTaskForm.js'
import { Plus } from 'react-feather'


//willjust be addtask btn 
export const AddRegularTask = ({ tasks, setTasks, ...props }) => {

  const [addingTask, setAddingTask] = useState(false)


  return (
    <>
      {addingTask ? (
        <AddTaskForm onClick={() => setAddingTask(false)} type={props.type} index={props.index} tasks={tasks} setTasks={setTasks} />
      ) : (
        <button onClick={() => setAddingTask(true)} className="add-regular" >
          <Plus color='#24e2e8df' />
        </button>
      )}
    </>
  )
}
