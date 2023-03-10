import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'

export const TaskDescription = ({ task, tasks, setTasks }) => {
    const [showInput, setShowInput] = useState(false)
    const [taskDescription, setTaskDescription] = useState(task.description)

    const params = useParams();

    const submitHandler = async (e) => {
        e.preventDefault()
        
        let descriptions = {oldDescription: task.description, updatedDescription: taskDescription}

        let projectName = params.id
        await fetch(`http://localhost:5000/edit-task/${projectName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(descriptions) //have to make it an object for some reason??
        })
        // setTasks(tasks.filter(t => t !== task))
        setShowInput(false)
    }

    useEffect(() => {
        console.log(showInput)
    })

    return (
        <>
            {showInput ?
                <form onSubmit={(e) => submitHandler(e)}>
                    <input autoFocus type="text" onBlur={() => setShowInput(false)} onChange={(e) => setTaskDescription(e.target.value)} name="description" />
                </form>
                :
                (
                    <span onDoubleClick={() => setShowInput(true)} className='task-description'>
                        <h2>{taskDescription}</h2>
                    </span>
                )
            }
        </>
    )
}
