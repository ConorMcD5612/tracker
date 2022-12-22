import React, {useState} from 'react'

import  Modal  from 'react-modal'

export const AddTier1 = ({ tasks, setTasks }) => {
    const [isOpen, setModalOpen] = useState(false);
    const [taskDescription, setTaskDescription] = useState("")

    const taskInput = (e) => {
        e.preventDefault()

        setTasks([...tasks, { tier: 1, description: taskDescription }])

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
                    <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
                    <button type="submit" >Close</button>
                </form>
            </Modal>
        </>
    )
}
