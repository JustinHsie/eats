import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../history';
import { Home } from '../Home';
import { CreateList } from '../CreateList';
import { EditPlace } from '../EditPlace';
import { ViewList } from '../ViewList';
import { Find } from '../Find';
import { NewPlace } from '../NewPlace';
import { Menu } from '../Menu';
import { User } from '../User';
import { NotFound } from '../NotFound';

export function AuthenticatedApp() {
  return (
    <Router history={history}>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/lists/new" exact component={CreateList} />
        <Route path="/lists/:id" exact component={ViewList} />
        <Route path="/find" exact component={Find} />
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:id" exact component={EditPlace} />
        <Route path="/user" exact component={User} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
