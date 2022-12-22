import React, { useState } from 'react'
import { ProjectModal } from './ProjectModal/ProjectModal'
import Modal from 'react-modal'

export const Project = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <div className="list-group-item list-group-item-action">
                <div className='d-flex w-100 justify-content-between'>
                    <h4>{props.name}</h4>
                    <h4> {props.hours}</h4>
                    <button onClick={() => setIsOpen(true)} className="btn">
                        <i class="bi bi-gear-fill"></i>
                    </button>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <ProjectModal name={props.name} closeModal={closeModal} />
            </Modal>
        </>
    )
}
