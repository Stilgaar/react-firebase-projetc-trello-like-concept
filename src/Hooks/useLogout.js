import { useEffect, useState } from 'react'
import { auth, fire } from '../Firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  // state pour le nettoyage (unmount) de composant
  const [isCancelled, setIsCancelled] = useState(false)
  // state pour les erreurs et les chargements
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  // fonction dispatch pour les differents etats du useReducer
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {

      // update le status Online, quand l'user logout, on passe son online à false (tout bêtement)
      // checkez bien que c'est que dans la collection 'users'
      const { uid } = user
      await fire.collection('users').doc(uid).update({ online: false })

      // sign the user out signOut() est unt methode de firebase
      await auth.signOut()

      // dispatch logout action // il appelle le dispatch de dans AuthContext.js pour le switch sur LOGOUT
      dispatch({ type: 'LOGOUT' })

      // update state (fonction "cleanup")
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  // function cleanup pour unmount le composant si on le quitte pendant le chargement
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}