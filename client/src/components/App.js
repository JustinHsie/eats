import React from 'react';
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Menu } from './Menu';
import { Lists } from './Lists';
import '../styles/App.css'

export const App = () => {
  return (
    <div className="p-m-4">
      <div>
        <Menu />
      </div>
      <div className="p-m-6">
        <Lists />
      </div>
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
