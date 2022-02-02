// hook react
import { useState } from "react";

// composant firebase
import { time } from '../../Firebase/config'

// hook perso
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useFirestore } from '../../Hooks/useFirestore'

// composant 
import Avatar from "../../Comp/Avatar";

// formatteur de dates (lib spéciale pour mettre des 'il y a ...')
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function ProjectComments({ doc }) {

    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('project')

    const [newComment, setNewComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: time.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(doc.id, {
            comment: [...doc.comment, commentToAdd]
        })

        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className="project-comments">
            <h4>Commentaires</h4>

            <ul>
                {doc.comment.length > 0 && doc.comment.map(com => (
                    <li key={com.id}>
                        <div className="comment-author">
                            <Avatar src={com.photoURL} />
                            <p>{com.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(com.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment-content">
                            <p>{com.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}
                className="add-comment">
                <label>
                    <span>Ton Com'</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />
                </label>
                <button className="btn">Envoyer</button>
            </form>
        </div>
    );
}

export default ProjectComments;