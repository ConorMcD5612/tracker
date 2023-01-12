
import { AddTaskBtn } from './AddTaskBtn'

import { CompleteBtn } from './CompleteBtn'


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
          <div className='tasks-container' style={{ backgroundColor: `#${tierColors[task.tier]}` }}>
            <div className='task'>
              <h3>{task.description}</h3>
              <h3>{task.tier}</h3>
              <div>
               
                {/* If the next task exists and its tier is greater than the the current tasks tier render nothing, otherwise render completebtn */}
                { tasks[index + 1]?.tier > task.tier ?  null : <CompleteBtn task={task} tasks={tasks} setTasks={setTasks}/>}

              
                {task.tier}
                <AddTaskBtn type="sub"  task={task} index={index} setTasks={setTasks} tasks={tasks} />
                <button className='btn'><i className="bi bi-chevron-down"></i></button>
              </div>
            </div>
          </div>
        </>
      )})}
      <AddTaskBtn type="new" tasks={tasks} setTasks={setTasks} />
    </>
  )
}
