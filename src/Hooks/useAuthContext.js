import { AuthContext } from "../Context/AuthContext"
import { useContext } from "react"

// on initialise le context pour en faire un hook. 
// du coup avec useAuthContext on pourra faire ça :
// {dispatch} = useAuthContext()
// ou 
// {user} = useAuthContext()
// vu que le provider dans AuthContext est écris comme ça : <AuthContext.Provider value={{ ...state, dispatch }}> {children} </AuthContext.Provider>.
// ouais du coup on fait un hook pour accèder à ça, et c'est plutot cool ! 

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}