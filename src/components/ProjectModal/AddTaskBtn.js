import React, { useState } from 'react'
import { AddTaskModal } from './AddTaskModal'
import { Plus } from 'react-feather'

//willjust be addtask btn 
export const AddTaskBtn = ({ tasks, setTasks, ...props }) => {

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false)


  return (
    <>
      <button className="add-task-button" onClick={() => setAddTaskModalOpen(true)} >
        <Plus color='#24e2e8df' />
      </button>

      <AddTaskModal type={props.type} index={props.index} addTaskModalOpen={addTaskModalOpen} setAddTaskModalOpen={setAddTaskModalOpen} tasks={tasks} setTasks={setTasks} />
    </>
  )
}
