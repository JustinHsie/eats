import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/App.css';
import Menu from './Menu';
import Lists from './Lists';

const App = () => {
  //const response = axios.get('/');

  return (
    <div className="App">
      <Menu />
      <Lists />
      <Link to="/lists/3">View List</Link>
      <Link to="/lists/edit">Edit List</Link>
    </div>
  );
};

export default App;
