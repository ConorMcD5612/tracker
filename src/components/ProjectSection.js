import React from 'react'
import { Project } from './Project'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'react-feather'

export const ProjectSection = () => {


    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/projects/')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
            })
    }, [projects.length])

    return (
        <div className='project-container'>
            <div className='project-section'>
                <header className='card-header'>
                    <h1>Projects:</h1>
                </header>
                <div className='card-body'>
                    <div className="list-group">
                        {projects?.map((project, index) => (
                            <Project key={index} name={project.name} hours={project.hours} />
                        ))}

                        <h4>Add Project</h4>
                        <Link to="/add-project">
                            <a>
                                <Plus />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='stats'>
                <h2>Stats go here</h2>
            </div>

            <div />

        </div>
    )
}
