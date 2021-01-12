import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import CreateList from './components/CreateList';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/lists/new" exact component={CreateList} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
