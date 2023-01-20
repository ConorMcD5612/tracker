import { Link } from 'react-router-dom'
import { Plus } from 'react-feather'

export const Project = (props) => {

    return (
        <>
         
                <div className='project-flex'>
                    <h4>{props.name}</h4>
                    <h4> {props.hours}</h4>
                    <Link to={props.name} >
                    <button className="addProject-btn">
                       <Plus />
                    </button>
                    </Link>
                </div>
       
         
        </>
    )
}
