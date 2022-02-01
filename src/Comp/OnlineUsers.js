// styles && images
import './OnlineUsers.css'

// hooks persos
import { useCollection } from "../Hooks/useCollection"

// composant 
import Avatar from './Avatar';

function OnlineUsers() {

    const { error, documents } = useCollection('users')

    return (
        <div className='user-list'>
            <h2>Utilisateurs</h2>
            {error && <div className="error">{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>

    );
}

export default OnlineUsers;