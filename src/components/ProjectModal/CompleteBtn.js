import React from 'react'
import { useParams } from 'react-router'

export const CompleteBtn = ({ task, tasks, setTasks }) => {
    const params = useParams();
    const completeTask = async () => {
        let projectName = params.id
        await fetch(`http://localhost:5000/edit/${projectName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
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
