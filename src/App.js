import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { userIsAuthenticated, userIsNotAuthenticated } from './helpers/auth';

import {Provider} from 'react-redux';
import store from './store';

import AppNavBar from './components/layout/AppNavBar'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/AddClient'
import EditClient from './components/clients/EditClient'
import ClientDetails from './components/clients/ClientDetails'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Settings from './components/settings/Settings'
import './App.css';

class App extends Component {
  render(){
  return (
    <Provider store={store}> 
      <Router>
      <div className="App">
        <AppNavBar/>
        <div className="container">
        <Switch>
          <Route exact path='/' component={ userIsAuthenticated(Dashboard) }></Route>
          <Route exact path='/client/add' component={userIsAuthenticated(AddClient)}></Route>
          <Route exact path='/client/edit/:id' component={userIsAuthenticated(EditClient)}></Route>
          <Route exact path='/client/:id' component={userIsAuthenticated(ClientDetails)}></Route>
          <Route exact path='/settings' component={userIsAuthenticated(Settings)}></Route>
          <Route exact path='/login' component={userIsNotAuthenticated(Login)}></Route>
          <Route exact path='/register' component={userIsNotAuthenticated(Register)}></Route>
        </Switch>
        </div>
      </div>
      </Router>
    </Provider>
  );}
}

export default App;
