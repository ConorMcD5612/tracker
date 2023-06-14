
import { AddTaskBtn } from './AddTaskBtn'
import { CompleteBtn } from './CompleteBtn'

import { ChevronDown, Clock } from 'react-feather'
import { TaskDescription } from './TaskDescription'
import { Outlet, useLocation } from 'react-router-dom'

import { Link } from "react-router-dom"


export const Tasks = ({ tasks, setTasks }) => {


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
              <div className='task-text'>
             <h2 className='task-seconds'>{task.seconds}</h2>
                <TaskDescription task={task} tasks={tasks} setTasks={setTasks} />
              </div>
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

                <AddTaskBtn type="sub" task={task} index={index} setTasks={setTasks} tasks={tasks} />
                <ChevronDown color='#24e2e8df' />
              </div>

            </div>
            <Outlet />
          </>
        )
      })}

      <AddTaskBtn type="new" tasks={tasks} setTasks={setTasks} />
    </>
  )
}
