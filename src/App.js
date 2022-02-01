// version (trop) commentée d'un projet react/firebase

// styles
import './App.css'

// router // attention ici j'ai utlisé la V5 de react routeur dom. La V6 est déjà sortie, et j'ai même fait un repo à ce sujet (même s'il n'est pas encore terminé.)
// je suppose que si vous lisez ça, vous savez comment utiliser le router de react. (et pourquoi vous l'utiliser)
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// hooks perso 
import { useAuthContext } from './Hooks/useAuthContext'

// import des pages, de dans ./Pages/ (obviously)
import Create from './Pages/Create/Create'
import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Login/Login'
import Project from './Pages/Project/Project'
import Signup from './Pages/Signup/Signup'

// import des composants (les séparer genre pour que ce soit plus propre ? )
import Navbar from './Comp/Navbar'
import Sidebar from './Comp/Sidebar'
import OnlineUsers from './Comp/OnlineUsers'

// pour mettre en place un serveur firebase avec react, check dans /Firebase/config.js

// pour lancer les règles (rules) et les joyeusetés de firebase on lance un 'firebase init' dans la console. Attention cela signifique que vous avez déjà installé le CLI de firebase auparavant. Et pour ça, quand même je ne vais pas vous prender par la main, mais c'est pa si complexe =)
// notez qu'on a deux paire de rules maintenant, un pour le storage (storage.rules), parcequ'on va stocker des petites images, et un pour le firebase à part qui sontt dans firestore.rules. 

// alors, pour les context et les hooks persos on réutilise (pour la plupart) ceux du dernier cours. je ne les ai pas commentés :D (Donc sur cette partie, j'ai envie de dire bisous hein)

// dans index.js on a wrap toute notre appli avec le context AuthContext, comprennant plusieurs hooks perso utilisé pour le login. Ca va aussi gérer l'état des composants de la route d'ici.

// fonctionnement des dossiers : 
// ./assets : fichiers (type jpg ou svg etc)
// ./Comp : les composants de notre site, qui seront réutilisés (ailleurs) par la suite
// ./Context : fichiers de context
// ./Hooks : Les hooks persos, ils sont même commentés maintenant
// ./Firebase : le fichier de config (config.js) pour la connection à firebase
// ./Pages : les pages differentes de notre site, il y aura dans ce dossiers les fichiers *.js de composants ne servant uniquement qu'à cette page

function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">

      {authIsReady && (

        <Router>

          {user && <Sidebar />}

          <div className='container'>

            <Navbar />

            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>
              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
            </Switch>

          </div>

          {user && <OnlineUsers />}

        </Router>

      )}

    </div>
  );
}

export default App
