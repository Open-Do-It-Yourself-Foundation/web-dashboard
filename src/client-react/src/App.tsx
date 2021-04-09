import React from 'react';
import {  BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import Home from './components/Home';
import Login from './components/Login';


const App:React.FC=()=> {
  return (
    <Router>
        
        <Switch>
          <Route path={'/'} exact component={Login} />
          <Route path={'/create'} exact component={CreateUser} />
          <Route path={'/home'} exact component={Home} />
          <Route path={'/edit/:email'} exact component={EditUser} />
        </Switch>
      </Router>
  );
}

export default App;
