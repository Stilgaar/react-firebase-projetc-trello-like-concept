// styles && images
import "./Navbar.css"
import temple from "../assets/temple.svg"

// routeur
import { Link } from "react-router-dom"

// hooks perso
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'

function Navbar() {

    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (

        <nav className="navbar">
            <ul>
                <li className="logo">
                    <img src={temple} alt="logo de notre 'trello'" />
                    <span>Homemade Trello</span>
                </li>

                {!user &&
                    <>
                        <li> <Link to='/login'>Login</Link> </li>
                        <li> <Link to='/signup'>Signup</Link> </li>
                    </>
                }

                {user &&
                    <li>
                        {isPending ? <button className="btn" disabled>Loggin' Out</button>
                            : <button className="btn" onClick={logout}>Logout</button>
                        }
                    </li>}
            </ul>

        </nav>

    );
}

export default Navbar;