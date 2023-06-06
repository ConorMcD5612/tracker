import { Link } from 'react-router-dom'
import { ArrowRight } from 'react-feather'

export const Project = (props) => {

    return (
        <>

            <div className='project-flex'>
                <span className='project-name'>
                    <h4>{props.name}</h4>
                </span>

                <span>
                    <h4>{props.hours} hours</h4>
                </span>

                <span className='project-link'>


                    <Link to={props.name} >
                        <button >
                            <ArrowRight color='#24e2e8df' />
                        </button>
                    </Link>
                </span>
            </div>


        </>
    )
}
