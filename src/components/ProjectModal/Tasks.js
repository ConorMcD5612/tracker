
import { AddTaskBtn } from './AddTaskBtn'

import { CompleteBtn } from './CompleteBtn'


export const Tasks = ({ tasks, setTasks }) => {
  
  // const haveComplete = () => {
  //   if()
  // }

 
  return (
    <>

      {tasks?.map((task, index) => {        
        return (
        <>
          <div className='card' style={{ transform: `translateX(${task.tier}vw)` }}>
            <div className='d-flex justify-content-between'>
              <h3>{task.description}</h3>
              <h3>{task.tier}</h3>
              <div>
                { index === tasks.length - 1 || tasks[index + 1].tier > task.tier ?  null : <CompleteBtn /> }
               
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
