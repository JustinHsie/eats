import React from 'react';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/App.css';
import MyMenu from './MyMenu';

const App = () => {
  //const response = axios.get('/');

  return (
    <div className="App">
      <MyMenu />
    </div>
  );
};

export default App;
