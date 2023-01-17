import React from 'react'
import { useParams } from 'react-router'
import { Check } from 'react-feather';

export const CompleteBtn = ({ task, tasks, setTasks }) => {
    const params = useParams();
    const completeTask = async () => {
        let projectName = params.id
        await fetch(`http://localhost:5000/remove-task/${projectName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        setTasks(tasks.filter(t => t !== task))
    }
    
    
    
    return (
        <button onClick={() => completeTask()} className='complete-btn'>
            <div >
              <Check />
              
            </div>
        </button>
    )
}
