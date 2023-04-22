import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Registro from './Registro';
import Comunicados from './Comunicados';
import PrivateRoute from './PrivateRoute';
import PublicarComunicado from './PublicarComunicado';
import PublicarVotacion from './PublicarVotacion';
import Votacion from './Votaciones';
import EnviarSugerencia from './EnviarSugerencia';
import GestionComunidad from './GestionComunidad';

export const apiURL = "http://localhost:8083";

export const AuthContext = React.createContext({
  authenticated: true,
  setAuthenticated: (auth) => { }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.setAuthenticated = (auth) => {
      this.setState({ authenticated: auth });
    };

    this.state = {
      authenticated: true,
      setAuthenticated: this.setAuthenticated,
    };
  }

  fadeOut(element, velocidad) {
    var variacion = velocidad/100;
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= variacion){
            clearInterval(timer);
            element.style.opacity = 0;
            element.style.filter = 'alpha(opacity=' + 0 + ")";
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * variacion;
    }, 10);
  }

  componentWillMount() {
    fetch(apiURL + '/auth', {
        credentials: 'include'
    }).then((response) => {

      this.fadeOut(document.getElementsByClassName("loaderCaja")[0],20);
      this.fadeOut(document.getElementsByClassName("loaderDiv")[0],5);

      if (response.status===200)
        this.state.setAuthenticated(true);
      else
        this.state.setAuthenticated(false);
    });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact={true} component={Comunicados}/>
            <Route path='/registro' exact={true} component={Registro}/>
            <Route path='/login' exact={true} component={Login}/>
            <PrivateRoute path='/publicarcomunicado' exact={true} component={PublicarComunicado}/>
            <PrivateRoute path='/publicarvotacion' exact={true} component={PublicarVotacion}/>
            <PrivateRoute path='/votaciones' exact={true} component={Votacion}/>
            <PrivateRoute path='/gestioncomunidad' exact={true} component={GestionComunidad}/>
            <PrivateRoute path='/enviarsugerencia' exact={true} component={EnviarSugerencia}/>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;