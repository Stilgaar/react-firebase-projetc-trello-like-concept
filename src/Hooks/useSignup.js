import { useState, useEffect } from 'react'
import { auth, storage, fire } from '../Firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  // state pour le nettoyage (unmount) de composant
  const [isCancelled, setIsCancelled] = useState(false)
  // state pour les erreurs et les chargements
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  // fonction dispatch pour les differents etats du useReducer
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {

    setError(null)
    setIsPending(true)

    try {
      // signup. le .createUserWithEmailAndPassword() est une methode de firebase
      const res = await auth.createUserWithEmailAndPassword(email, password)

      if (!res) { // s'il y a une erreur, pour tomber direct dans le catch block
        throw new Error("Vous n'avez pas réussi à crée un compte (pour des raisons...)")
      }

      // upload la photo de profile de l'user. thumbnails va être nu dossier crée dans notre firebase sans que nous ayons à le crée avant. (un peu comme une collection tu sais)
      // puis on va lui indiquer de mettre dans un dossier avec l'USER ID, avec le nom de l'image.
      // ce sera plus simlpe pour la retourver par la suite
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`

      // l'image sera mis dans le (storage (de dans firebase/config.js)), on lui indique la référence qu'on a crée au dessus, et on lui dit de mettre également le thumbnail avec la methode put()
      const img = await storage.ref(uploadPath).put(thumbnail)

      // enfin dans l'img qu'on reçoit on utlise une autre methode .ref.getDownloadURL() pour avoir l'url de l'image ainsi crée dans firebase
      const imgURL = await img.ref.getDownloadURL()

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgURL })

      // création d'une collection d'users séparés
      // normallement quand on crée une nouvelle entrée dans une collection on va avoir tendance à utliser la methode add()
      // mais la dans la collection users on veut que l'id soit déjà celle de l'user en question donc on utilise la methode doc()
      // ensuite avec la methode set() on va aller lui caller un objet. 
      // doc() va verifier si un objet existe pour faire un set par la suite. Mais s'il trouve rien il va crée directement et objet avec l'user id (uid)
      await fire.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgURL
      })
      // on crée cette collection pour pouvoir lister les users online et les offline

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

  return { signup, error, isPending }
}