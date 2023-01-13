
import { AddTaskBtn } from './AddTaskBtn'

import { CompleteBtn } from './CompleteBtn'
import { ChevronDown } from 'react-feather'


export const Tasks = ({ tasks, setTasks }) => {

  let tierColors = {
    1: "264653",
    2: "2A9D8F",
    3: "E9C46A",
    4: "F4A261",
    5: "E76F51",
  }


  return (
    <>

      {tasks?.map((task, index) => {
        return (
          <>
            <div>
              <div style={{ backgroundColor: `#${tierColors[task.tier]}`, width: `${50-task.tier}vw` }} className='task'>
                <h2>{task.description}</h2>
                <h2>{task.tier}</h2>
                <div>

                  {/* If the next task exists and its tier is greater than the the current tasks tier render nothing, otherwise render completebtn */}
                  {tasks[index + 1]?.tier > task.tier ? null : <CompleteBtn task={task} tasks={tasks} setTasks={setTasks} />}



                  <AddTaskBtn type="sub" task={task} index={index} setTasks={setTasks} tasks={tasks} />
                 <ChevronDown />
                </div>
              </div>
            </div>
          </>
        )
      })}
      <AddTaskBtn type="new" tasks={tasks} setTasks={setTasks} />
    </>
  )
}
