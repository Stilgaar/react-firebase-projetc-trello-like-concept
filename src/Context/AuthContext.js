import { createContext, useReducer, useEffect } from 'react'
import { auth } from '../Firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {

  // le reducer pour voir l'état de l'autantification. Il se compose un peu comme un super useState, mais on lui passe un état, et un dispatch. 
  // l'état reste l'état mais le dipatch quant à elle est une fonction vu qui va faire référence à la fonction dans les arguments (ici authReducer) qui va, avec un switch, 
  // changer des états de façon très présises selon l'état du process.
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  // check si le token est encore actif. Si oui, on remet l'user dans la data du site via le payload et le reducer AUTH via le dispach du useReducer
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH', payload: user })
      unsub()
    })
  }, [])

  // pour chercker si on a un user ou non, c'est toujours utile
  console.log('AuthContext state:', state)

  // on passe tout ce qu'il y a dans notre composant (avec le props {children} plus haut, dans ces balises pour le provider.)
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )

}