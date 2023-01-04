import React, { useState } from 'react'
import { AddTaskModal } from './AddTaskModal'

//willjust be addtask btn 
export const AddTaskBtn = ({ tasks, setTasks, ...props }) => {

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false)

  
  return (
    <>
      <button onClick={() => setAddTaskModalOpen(true)} className='btn btn-sm btn-success'>
        <div className='add-flex d-flex align-items-center '>
          <i className='bi bi-plus-square-fill'></i>
          <h5>{props.type}</h5>
        </div>
      </button>


    <AddTaskModal type={props.type} index={props.index} addTaskModalOpen={addTaskModalOpen} setAddTaskModalOpen={setAddTaskModalOpen} tasks={tasks} setTasks={setTasks} />
    </>
  )
}
