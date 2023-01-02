import React, { useState } from 'react'
import Modal from 'react-modal'

export const AddTaskModal = ({ setTasks, tasks, addTaskModalOpen, setAddTaskModalOpen, ...props }) => {
    const [taskDescription, setTaskDescription] = useState("")

    const taskInput = async (e) => {
        e.preventDefault()

        //have to make task object
        let newTask = {
            tier: tasks[props.index].tier + 1,
            description: taskDescription
        }
        console.log(tasks.length)

        //post data 
        await fetch("http://localhost:5000/tasks/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }).then(setTasks([newTask])) // force re-render ProjectModal to fetch new-tasks 



        closeTaskModal()
    }

    const closeTaskModal = () => {
        setAddTaskModalOpen(false)
    }


    return (
        <Modal isOpen={addTaskModalOpen} onRequestClose={closeTaskModal}>
            <form onSubmit={(e) => taskInput(e)}>
                <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
                <button type="submit"  >Close</button>
            </form>
        </Modal>
    )
}
