import React from 'react'

export const CompleteBtn = ({ task, tasks, setTasks }) => {

    const completeTask = () => {
        setTasks(tasks.filter(t => t !== task))
    }
    return (
        <button onClick={() => completeTask()} className='btn btn-sm btn-success'>
            <div className='add-flex d-flex align-items-center '>
                <i class="bi bi-check-square-fill"></i>
                <h5>Complete</h5>
            </div>
        </button>
    )
}
