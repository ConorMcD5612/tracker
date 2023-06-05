import React, { useState } from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router'

export const AddTaskModal = ({ setTasks, tasks, addTaskModalOpen, setAddTaskModalOpen, ...props }) => {
    const [taskDescription, setTaskDescription] = useState("")

    const params = useParams()

    const taskInput = async (e) => {
        e.preventDefault()
        let newTask = {}

        //if sub index is one more then the one this was called on 
        if (props.type == "sub") {
            newTask = {
                id: props.index + 1,
                tier: tasks[props.index].tier + 1,
                description: taskDescription,
               
            }
            
        }
        console.log("before if ")
        if (props.type == "new") {
            console.log(props.index)
            newTask = {
                id: tasks.length,
                tier: 1,
                description: taskDescription,
            }
        }

        await fetch(`http://localhost:5000/projects/${params.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        setTasks([...tasks, newTask])
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
