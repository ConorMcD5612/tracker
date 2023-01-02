
import { AddSubTask } from './AddSubTask'
import { AddTier1 } from './AddTier1'
import { CompleteBtn } from './CompleteBtn'


export const Tasks = ({ tasks, setTasks }) => {
  
  
 
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
                <CompleteBtn task={task} tasks={tasks} setTasks={setTasks}/>
                <AddSubTask task={task} index={index} setTasks={setTasks} tasks={tasks} />
                <button className='btn'><i className="bi bi-chevron-down"></i></button>
              </div>
            </div>
          </div>
        </>
      )})}
      <AddTier1 tasks={tasks} setTasks={setTasks} />
    </>
  )
}
