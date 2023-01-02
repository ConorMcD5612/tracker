import { Link } from 'react-router-dom'

export const Project = (props) => {

    return (
        <>
            <div className="list-group-item list-group-item-action">
                <div className='d-flex w-100 justify-content-between'>
                    <h4>{props.name}</h4>
                    <h4> {props.hours}</h4>\
                    <Link to={props.name} >
                    <button className="btn">
                        <i class="bi bi-gear-fill"></i>
                    </button>
                    </Link>
                </div>
            </div>
         
        </>
    )
}
