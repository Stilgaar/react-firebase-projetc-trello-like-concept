// styles && images
import './Sidebar.css'
import add from "../assets/add_icon.svg"
import dashboard from "../assets/dashboard_icon.svg"

// routeur
import { NavLink } from "react-router-dom"

// composant 
import Avatar from './Avatar'

// hooks perso
import { useAuthContext } from "../Hooks/useAuthContext"

function Sidebar() {

    const { user } = useAuthContext()

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user?.photoURL} />
                    <p>Salut {user?.displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={dashboard} alt="icon dashboard" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={add} alt="icone add" />
                                <span>Nouveau Projet</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;