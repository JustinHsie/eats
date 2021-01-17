import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './components/App';
import { CreateList } from './components/CreateList';
import { ViewList } from './components/ViewList';
import { Find } from './components/Find';
import { NewPlace } from './components/NewPlace';
import { Menu } from './components/Menu';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/lists/new" exact component={CreateList} />
        <Route path="/lists/:id" exact component={ViewList} />
        <Route path="/find" exact component={Find} />
        <Route path="/places/new" exact component={NewPlace} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
