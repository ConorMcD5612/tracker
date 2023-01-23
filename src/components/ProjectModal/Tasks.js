
import { AddTaskBtn } from './AddTaskBtn'
import { useState } from 'react'
import { CompleteBtn } from './CompleteBtn'
import { ChevronDown } from 'react-feather'
import { TimerBtn } from './TimerBtn'
import { TaskDescription } from './TaskDescription'


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
            <div className='task' style={{ width: `${task.tier == 1 ? 71 : 71 - task.tier}vw` }}>
              <div style={{ transform: `translateX(${task.tier == 1 ? null : task.tier}vw)` }} className='task-text'>
               <TaskDescription task={task} tasks={tasks} setTasks={setTasks} />
                <div>

                  {/* If the next task exists and its tier is greater than the the current tasks tier render nothing, otherwise render completebtn */}
                  {tasks[index + 1]?.tier > task.tier ? null : (
                  <>
                  <TimerBtn />
                  <CompleteBtn task={task} tasks={tasks} setTasks={setTasks} />
                  </>
                  )}



                  <AddTaskBtn type="sub" task={task} index={index} setTasks={setTasks} tasks={tasks} />
                  <ChevronDown />
                </div>
              </div>
              <div className="color" style={{ backgroundColor: `#${tierColors[task.tier]}`, marginLeft: `${task.tier == 1 ? null : task.tier}vw` }}>

              </div>
            </div>
          </>
        )
      })}
      <AddTaskBtn type="new" tasks={tasks} setTasks={setTasks} />
    </>
  )
}
