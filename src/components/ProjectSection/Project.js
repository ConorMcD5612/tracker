import { Link } from "react-router-dom";
import { ArrowRight } from "react-feather";
import { useEffect } from "react";

export const Project = (props) => {

  useEffect(() => {
    console.log(props)
  })
  return (
    <>
      <div className="project-flex">
        <span className="project-name">
          <h4>{props.name}</h4>
        </span>

        <span>
          <h4>{props.hours} hours</h4>
        </span>

        <span className="project-link">
          <Link state={{index: props.index}}to={props.name}>
            <button>
              <ArrowRight color="#24e2e8df" />
            </button>
          </Link>
        </span>
      </div>
    </>
  );
};
