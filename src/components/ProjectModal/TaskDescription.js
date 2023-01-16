import React, { useEffect } from 'react'
import { useState } from 'react'

export const TaskDescription = ({ task }) => {
    const [showInput, setShowInput] = useState(false)
    const [taskDescription, setTaskDescription] = useState(task.description)

    const submitHandler = (e) => {
        e.preventDefault()
        // update db 

        //
        setShowInput(false)
    }

    useEffect(() => {
        console.log(showInput)
    })

    return (
        <>
            {showInput ?
            <form onSubmit={(e) => submitHandler(e)}>
                 <input autoFocus type="text" onBlur={() => setShowInput(false)}  onChange={(e) => setTaskDescription(e.target.value)} name="description" />
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
