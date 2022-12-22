import React from 'react'
import { AddProject } from './AddProject'
import { Projects } from './Projects'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export const ProjectSection = () => {

    //onclick add project
    const [projects, setProjects] = useState([])
    //this is where fetch will go 
    useEffect(() => {
        fetch('http://localhost:5000/projects/')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
            })
    }, [projects.length])
    return (
        <div className='card project-section'>

            <header className='card-header'>
                <h1>Projects:</h1>
            </header>
            <div className='card-body'>
                <div className="list-group">
                    <Projects projects={projects} />
                 
                    <h4>Add Project</h4>
                    <Link to="/add-project">
                        <a>
                        <button className='btn btn-primary btn-md'>+</button>
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    )
}
