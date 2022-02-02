// styles
import './Projectlist.css'

// routeur dom
import { Link } from "react-router-dom"

// composants
import Avatar from './Avatar';

function Projectlist({ projects }) {


    return (
        <div className='project-list'>
            {projects.lenght === 0 && <p>Pas de projet en cours</p>}

            {projects.map(project => (
                <Link
                    to={`/projects/${project.id}`}
                    key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Esperé pour {project.dueDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUsersList.map(assigned => (
                                <li key={assigned.photoURL}>
                                    <Avatar src={assigned.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}

        </div>
    );
}

export default Projectlist;