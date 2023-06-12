import React from 'react'


import { useState, useEffect } from 'react'
import { useParams, Outlet} from 'react-router'
import { Tasks } from './Tasks'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Settings } from 'react-feather'
import './taskStyles.scss'


export const ProjectModal = ({ closeModal, ...props }) => {

  const [tasks, setTasks] = useState([])

  const params = useParams()


  


  useEffect(() => {

    fetch(`http://localhost:5000/projects/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks)
      })
    console.log("fetched")
    console.log(tasks)
  }, [tasks.length])

  const capitlize = (text) => {
    const str = text.charAt(0).toUpperCase() + text.slice(1)
    console.log(str)

    return str
  }

  return (
    <div className="task-page-container">
      <div className='project-info'>
        <header>
        <h1>{capitlize(params.id)}</h1>
        </header>
  
        <div className='hours'>
          <h1>Hours spent:</h1>
          <h3><span>Today:</span> 5 hours</h3>
          <h3><span>Week:</span> 10 hours</h3>
          <h2><span>Total:</span> 500 hours </h2>
        </div>

        <p className='project-description'>
          <h1>Description:</h1>
          is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
        </p>
        <div className='project-info-buttons'>


          <Link to="/projects">
            <ArrowLeft color='#24e2e8df' size={32}/>
          </Link>
          <Settings color='#24e2e8df' size={32} />
        </div>
      </div>

      <div className='tasks-container'>
        <div className='current-task'>
          <h1>Current: </h1>
          <h2>go to grocery store otherwise</h2>
        </div>
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
   


    </div>
  )
}

//Takss is the same for all projects 
// dont think htat is actually the problem it just rerenders tasks? even though things are deleted
// will be fixed when database is implemented 