// styles
import './Login.css'

// Hook 
import { useState } from 'react';

// hook perso 
import { useLogin } from '../../Hooks/useLogin'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, isPending, error } = useLogin()

    const handleSumbit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form className="auth-form" onSubmit={handleSumbit}>
            <h2>Login</h2>
            <label>
                <span>Email</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
            </label>
            <label>
                <span>Password </span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </label>

            {isPending ? <button className="btn" disabled>Loading ... </button> : <button className="btn">Login</button>}
            {error && <div className="error">{error}</div>}
        </form>

    );
}

export default Login;