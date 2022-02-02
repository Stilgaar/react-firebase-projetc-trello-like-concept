import { useReducer, useEffect, useState } from "react"
import { fire, time } from '../Firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATE_DOCUMENT':
      return { isPending: false, document: action.payload, super: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

// le reducer pour voir l'état du document'. Il se compose un peu comme un super useState, mais on lui passe un état (state, ici response), et un dispatch. 
// l'état (response) reste l'état, un peu comme dans useState. 
// mais le dipatch quant à elle est une fonction vu qui va faire référence à la fonction dans les arguments (ici firestoreReducer) qui va, avec un switch, 
// changer des états de façon très présises selon l'état du process. Ici pour allèger le code on a enlevé l'état initial (initialState) et on l'a appellé plus haut pour que ça fasse plus propre
// on pourrait aussi du coup faire un autre reducer avec, un autre initialstate plus tard, pour plus de réutilisabilité. 

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = fire.collection(collection)

  // on crée une fonction de cleanup qu'on va passser dans les fonctions pour ne pas réécrire ce bout de code 10000 fois
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = time.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Impossible de supprimer' })
    }
  }

  // update document 
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: 'UPDATE_DOCUMENT', payload: updatedDocument })
      return updatedDocument
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  // function cleanup pour unmount le composant si on le quitte pendant le chargement
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }

}
