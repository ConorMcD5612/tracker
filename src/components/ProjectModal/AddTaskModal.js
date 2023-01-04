import React, { useState } from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router'

export const AddTaskModal = ({ setTasks, tasks, addTaskModalOpen, setAddTaskModalOpen, ...props }) => {
    const [taskDescription, setTaskDescription] = useState("")

    const params = useParams()

    const taskInput = async (e) => {
        e.preventDefault()
        let newTask = {}
        if (props.type == "sub") {
            newTask = {
                prevTaskIndex: props.index,
                tier: tasks[props.index].tier + 1,
                description: taskDescription
            }
            console.log(props.index)
        }

        if (props.type == "new") {
            newTask = {
                tier: 1,
                description: taskDescription
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
