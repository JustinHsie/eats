import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { connectApp } from './components/App';
import { connectCreateList } from './components/CreateList';
import { connectEditPlace } from './components/EditPlace';
import { connectViewList } from './components/ViewList';
import { connectFind } from './components/Find';
import { connectNewPlace } from './components/NewPlace';
import { Menu } from './components/Menu';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact component={connectApp} />
          <Route path="/lists/new" exact component={connectCreateList} />
          <Route path="/lists/:id" exact component={connectViewList} />
          <Route path="/find" exact component={connectFind} />
          <Route path="/places/new" exact component={connectNewPlace} />
          <Route path="/places/:id" exact component={connectEditPlace} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
