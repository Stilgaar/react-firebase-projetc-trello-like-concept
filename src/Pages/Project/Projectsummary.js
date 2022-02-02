// composant 
import Avatar from '../../Comp/Avatar'

// hook perso 
import { useFirestore } from '../../Hooks/useFirestore'
import { useAuthContext } from '../../Hooks/useAuthContext'

// react router dom
import { useHistory } from 'react-router-dom'

function Projectsummary({ doc }) {

    const { deleteDocument } = useFirestore('project')
    const { user } = useAuthContext()
    const history = useHistory()

    const handleClick = (e) => {
        deleteDocument(doc.id)
        history.push('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{doc.name}</h2>
                <p>Projet crée par {doc.createdBy.displayName}</p>
                <p className="due-date">
                    Date limite : {doc.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {doc.detail}
                </p>
                <h4>Personnes sur le projet</h4>
                <div className='assigned-users'>
                    {doc.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === doc.createdBy.id &&
                <button onClick={handleClick} className="btn">Projet Terminé</button>}
        </div>
    );
}

export default Projectsummary;