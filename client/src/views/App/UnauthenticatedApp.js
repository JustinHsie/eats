import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../history';
import { Login } from '../Login';
import { Register } from '../Register';

export function UnauthenticatedApp() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}
