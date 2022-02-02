// hooks react
import { useState, useEffect } from 'react'
import { fire } from '../Firebase/config'

export const useDocument = (collection, id) => {

    // state pour récupérer les datas
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // avoir la data en temps réel du document (un real time listener)

    useEffect(() => {

        const ref = fire.collection(collection).doc(id)

        const unsub = ref.onSnapshot(snapshot => {

            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError("Cette page n'existe pas")
            }

        }, (err) => {
            console.log(err.message)
            setError('Document non atteint')
        })

        return () => unsub()

    }, [collection, id])

    return { document, error }

}