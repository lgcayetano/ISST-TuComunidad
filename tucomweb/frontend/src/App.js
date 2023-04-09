import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ComunidadList from './ComunidadList';
import Registro from './Registro';

export const apiURL = "http://localhost:8083";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            {/* <Route path='/comunidades' exact={true} component={ComunidadList}/> */}
            <Route path='/registro' exact={true} component={Registro}/>
          </Switch>
        </Router>
    )
  }
}

export default App;