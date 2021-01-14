import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/App.css';
import { Menu } from './Menu';
import { Lists } from './Lists';

export const App = () => {
  //const response = axios.get('/');

  return (
    <div className="App">
      <Menu />
      <Lists />
      <div>
        <Link to="/lists/new">Create List</Link>
      </div>
      <div>
        <Link to="/lists/3">View List</Link>
      </div>
      <div>
        <Link to="/lists/edit">Edit List</Link>
      </div>
      <div>
        <Link to="/find">Find Near Me</Link>
      </div>
    </div>
  );
};
