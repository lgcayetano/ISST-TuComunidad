import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ComunidadList from './ComunidadList';
import Registro from './Registro';
import Comunicados from './Comunicados';
import PrivateRoute from './PrivateRoute';

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

  componentWillMount() {
    fetch(apiURL + '/auth', {
        credentials: 'include'
    }).then((response) => {
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
            <PrivateRoute path='/comunidades' exact={true} component={ComunidadList}/>
            <Route path='/registro' exact={true} component={Registro}/>
            <Route path='/login' exact={true} component={Login}/>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;