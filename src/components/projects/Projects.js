import React, { useEffect } from 'react'
import { Project } from './Project'
import { useState } from 'react'
export const Projects = ({projects}) => {
  //project array 
 
  useEffect(() => {
    console.log(projects)
  })
  
  return (
    <>
    {projects?.map((project, index) => (
      <Project key={index} name={project.name} hours={project.hours} />
    ))}
    </>
  )
}
