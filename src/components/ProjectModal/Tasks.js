
import { AddRegularTask } from './AddRegularTask'
import { CompleteBtn } from './CompleteBtn'

import { ChevronDown, Clock } from 'react-feather'
import { TaskDescription } from './TaskDescription'
import { Outlet, useLocation } from 'react-router-dom'
import { AddSubTask } from './AddSubTask'
import { Plus } from 'react-feather'


import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'


export const Tasks = ({ tasks, setTasks }) => {
  
  const [subId, setSubId] = useState(-1)

  let tierColors = {
    1: "264653",
    2: "2A9D8F",
    3: "E9C46A",
    4: "F4A261",
    5: "E76F51",
  }

  const location = useLocation();

 



  return (
    <>
      {tasks?.map((task, index) => {
        return (
          <>
            <div className='task' >

              <TaskDescription task={task} tasks={tasks} setTasks={setTasks} />

              <div className='task-buttons'>


                {/* If the next task exists and its tier is greater than the the current tasks tier render nothing, otherwise render completebtn */}
                {tasks[index + 1]?.tier > task.tier ? null : (
                  <>
                    <Link to={`timer/task/${index}`} state={{ background: location }}>
                      <Clock color='#24e2e8df' />
                    </Link>
                    <CompleteBtn task={task} tasks={tasks} setTasks={setTasks} />
                  </>
                )}

                <Plus onClick={() => setSubId(task.id)} color='#24e2e8df' />
                <ChevronDown color='#24e2e8df' />
                
              </div>
                  

            </div>
            <AddSubTask type="sub" task={task} index={index} setTasks={setTasks} tasks={tasks} setSubId={setSubId} subId={subId} />
         
            <Outlet />
          </>
        )
      })}

      <AddRegularTask type="new" tasks={tasks} setTasks={setTasks} />
    </>
  )
}
