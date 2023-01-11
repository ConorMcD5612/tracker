import React from 'react'


import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Tasks } from './Tasks'
import { Link } from 'react-router-dom'


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
  }, [tasks.length])


  return (
    <div className="projectModal-container">
      <div>
      <h1>{props.name}</h1>
      <h2>Daily: 5hrs</h2>
      <h2>Weekly: 10hrs</h2>
      <h2>Total: 500 hrs </h2>
      </div>

     <p className='project-description'>
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
     </p>

      <Tasks tasks={tasks} setTasks={setTasks} />


      <Link to="/projects">
        <button className='btn btn-primary'>OK</button>
      </Link>

    </div>
  )
}

//Takss is the same for all projects 
// dont think htat is actually the problem it just rerenders tasks? even though things are deleted
// will be fixed when database is implemented 