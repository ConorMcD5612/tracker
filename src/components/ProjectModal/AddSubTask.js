import React, { useState } from 'react'
import { AddTaskForm } from './AddTaskForm'
import { Plus } from 'react-feather'

export const AddSubTask = ({ tasks, setTasks, subId, setSubId, ...props }) => {
 

    return (
        <div className='add-sub'>
            { tasks[props.index].id == subId ?  <AddTaskForm onClick={() => setSubId(-1)} type={props.type} index={props.index} tasks={tasks} setTasks={setTasks} /> : 
                null
             }
          


        </div>

    )
}
