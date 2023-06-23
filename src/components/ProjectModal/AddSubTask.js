import React, { useState } from 'react'
import { AddTaskForm } from './AddTaskForm'
import { Plus } from 'react-feather'

export const AddSubTask = ({ tasks, setTasks, openSubIndex, setOpenSubIndex, ...props }) => {


    return (
        <div className='add-sub'>
            {tasks[props.index] == tasks[openSubIndex] ? <AddTaskForm onBlur={() => setOpenSubIndex(-1)} onClick={() => setOpenSubIndex(-1)} type={props.type} index={props.index} tasks={tasks} setTasks={setTasks} /> :
                null
            }
        </div>

    )
}
