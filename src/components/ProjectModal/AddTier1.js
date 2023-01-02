import React, {useState} from 'react'
import { useParams } from 'react-router'

import  Modal  from 'react-modal'

export const AddTier1 = ({ tasks, setTasks }) => {
    const [isOpen, setModalOpen] = useState(false);
    const [taskDescription, setTaskDescription] = useState("")
    const params = useParams()

    // const updateTaskDesc = (value) => {
    //     //what does the first return do? / point
    //     //takes in object {name: e.target.value}
    //     return setForm((prev) => {
    //       //everything in previous object and everything in value
    //       return { ...prev, ...value }
    //     })
    //   }
    

    const taskInput = async (e) => {
        e.preventDefault()
        console.log(taskDescription)
        const newTask = {description: taskDescription, tier: 1}
        console.log(newTask)
        await fetch(`http://localhost:5000/projects/${params.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        
        setTasks([...tasks, { tier: 1, description: taskDescription }])
        console.log(taskDescription)
        closeTaskModal()
    }

    const closeTaskModal = () => {
        setModalOpen(false)
    }

    return (
        <>
            <div className='card' onClick={() => setModalOpen(true)} style={{ borderStyle: "dotted" }}>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-sm btn-success bi bi-plus-square-fill'>
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onRequestClose={closeTaskModal}>
                <form onSubmit={(e) => taskInput(e)}>
                    <input type="text" onChange={e => setTaskDescription(e.target.value)} />
                    <button type="submit" >Close</button>
                </form>
            </Modal>
        </>
    )
}
