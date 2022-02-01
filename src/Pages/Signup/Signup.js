// styles
import "./Signup.css"

// Hooks
import { useState } from "react";

// Hook Persos
import { useSignup } from "../../Hooks/useSignup";

function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, isPending, error } = useSignup()


    const handleSumbit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]

        if (!selected) {
            setThumbnailError('Vous devez choisir un fichier')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Vous devez choisir une image')
            return
        }
        if (selected.size > 100001) {
            setThumbnailError("Taille de l'image doit être moins de 100kb")
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)

        console.log('thumbnail updated')
    }

    return (
        <form className="auth-form" onSubmit={handleSumbit}>
            <h2>Signup</h2>

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

            <label>
                <span>User Name </span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName} />
            </label>

            <label>
                <span>Photo de profil (- 100kb)</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange} />

                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>

            {isPending ? <button className="btn" disabled>Loading ... </button> : <button className="btn">Sign Up</button>}


            {error && <div className="error">{error}</div>}

        </form>


    );
}

export default Signup;