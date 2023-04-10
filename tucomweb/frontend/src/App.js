import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ComunidadList from './ComunidadList';
import Registro from './Registro';
import Comunicados from './Comunicados';

export const apiURL = "http://localhost:8083";
export let logueado = false;

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Comunicados}/>
            <Route path='/comunidades' exact={true} component={ComunidadList}/>
            <Route path='/registro' exact={true} component={Registro}/>
            <Route path='/login' exact={true} component={Login}/>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
    )
  }
}

export default App;