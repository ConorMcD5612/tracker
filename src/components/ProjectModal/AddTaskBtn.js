import React, { useState } from 'react'
import { AddTaskModal } from './AddTaskModal'
import { Plus } from 'react-feather'

//willjust be addtask btn 
export const AddTaskBtn = ({ tasks, setTasks, ...props }) => {

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false)


  return (
    <>
      <button className="addTask-btn btn btn-sm btn-success" onClick={() => setAddTaskModalOpen(true)} >
        <div className='add-flex d-flex align-items-center '>
          <Plus color='#24e2e8df' />
        </div>
      </button>


      <AddTaskModal type={props.type} index={props.index} addTaskModalOpen={addTaskModalOpen} setAddTaskModalOpen={setAddTaskModalOpen} tasks={tasks} setTasks={setTasks} />
    </>
  )
}
