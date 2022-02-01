import { useState, useEffect } from 'react'
import { auth, fire } from '../Firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  // state pour le nettoyage (unmount) de composant
  const [isCancelled, setIsCancelled] = useState(false)
  // state pour les erreurs et les chargements
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  // fonction dispatch pour les differents etats du useReducer
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // on check sur l'auth (de firebase) avec la methode spécifque .signInWithEmailAndPassword() avec l'email et le mot de passe
    // si c'est good, on dispatch en activant le "LOGIN" dans le switch de AuthContext.js et on lui passe l'user. 

    try {
      // login
      const res = await auth.signInWithEmailAndPassword(email, password)


      // on remet l'user online dans la collection 'users'
      await fire
        .collection('users')
        .doc(res.user.uid)
        .update({ online: true })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

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

  return { login, isPending, error }
}