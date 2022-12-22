import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router'



export const AddProject = ({ projects, setProjects }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    hours: 0,
    name: "",
  })

  const updateForm = (value) => {
    //what does the first return do? / point
    //takes in object {name: e.target.value}
    return setForm((prev) => {
      //everything in previous object and everything in value
      return { ...prev, ...value }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPerson = { ...form }

    //use navigate was not working when used after the fetch I guess this works? 
    navigate("/projects")
    await fetch("http://localhost:5000/projects/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPerson)
    })
    setProjects([...projects, newPerson])
   
  }

  return (
    <div className='list-group-item d-flex justify-content-between align-items-center bg-secondary'>
      <form onSubmit={(e) => submitHandler(e)}>
        <input type="text" onChange={e => updateForm({ name: e.target.value })} />
        <input type="number" onChange={e => updateForm({ hours: e.target.value })} />
        <button type="submit" >Create Project</button>
      </form>
    </div>
  )
}