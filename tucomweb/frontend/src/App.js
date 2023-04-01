import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ComunidadList from './ComunidadList';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/comunidades' exact={true} component={ComunidadList}/>
          </Switch>
        </Router>
    )
  }
}

export default App;