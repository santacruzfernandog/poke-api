import React from 'react'
import Pokemones from './components/Pokemones';
import Perfil from './components/Perfil';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {auth} from './firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  // Firebase
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
  }, [])

  const RutaPrivada = ({component, path, ...rest})=> {
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest}/>
      } else {
        return <Redirect to="/login" {...rest}/>
      }
    } else {
      return <Redirect to="/login" {...rest}/>
    }
  }

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar/>
        <Switch>
          <RutaPrivada component={Pokemones} path="/" exact/>
          <RutaPrivada component={Perfil} path="/perfil" exact/>
          <Route component={Login} path="/login" exact/>
        </Switch>
      </div>
    </Router>
  ) : (<div className="container mt-5">
          Cargando...
          <div className="spinner-grow spinner-grow-sm" role="status"></div>
      </div>)
}

export default App;
