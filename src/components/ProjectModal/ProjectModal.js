import React from 'react'


import { useState, useEffect } from 'react'
import { useParams, Outlet} from 'react-router'
import { Tasks } from './Tasks'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Settings } from 'react-feather'


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
    <div className="projectModal-container">
      <div className='project-info'>
        <h1>{capitlize(params.id)}</h1>
  
        <div className='hours'>
          <h2>Today: 5hr</h2>
          <h2>Week: 10hr</h2>
          <h2>Total: 500hr </h2>
        </div>

        <p className='project-description'>
          is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
        </p>
        <div className='buttons'>


          <Link to="/projects">
            <ArrowLeft />
          </Link>
          <Settings />
        </div>
      </div>

      <div className='tasks-container'>
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
   


    </div>
  )
}

//Takss is the same for all projects 
// dont think htat is actually the problem it just rerenders tasks? even though things are deleted
// will be fixed when database is implemented 