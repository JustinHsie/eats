import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './history';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { Home } from './views/Home';
import { CreateList } from './views/CreateList';
import { EditPlace } from './views/EditPlace';
import { ViewList } from './views/ViewList';
import { Find } from './views/Find';
import { NewPlace } from './views/NewPlace';
import { Menu } from './components/Menu';
import { NotFound } from './views/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lists/new" exact component={CreateList} />
          <Route path="/lists/:id" exact component={ViewList} />
          <Route path="/find" exact component={Find} />
          <Route path="/places/new" exact component={NewPlace} />
          <Route path="/places/:id" exact component={EditPlace} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
