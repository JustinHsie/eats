import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './history';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { ConnectApp } from './components/App';
import { ConnectCreateList } from './components/CreateList';
import { ConnectEditPlace } from './components/EditPlace';
import { ConnectViewList } from './components/ViewList';
import { ConnectFind } from './components/Find';
import { ConnectNewPlace } from './components/NewPlace';
import { Menu } from './components/Menu';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Menu />
        <Switch>
          <Route path="/" exact component={ConnectApp} />
          <Route path="/lists/new" exact component={ConnectCreateList} />
          <Route path="/lists/:id" exact component={ConnectViewList} />
          <Route path="/find" exact component={ConnectFind} />
          <Route path="/places/new" exact component={ConnectNewPlace} />
          <Route path="/places/:id" exact component={ConnectEditPlace} />
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
