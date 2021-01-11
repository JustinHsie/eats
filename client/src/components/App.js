import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import axios from 'axios';
import UserList from './UserList';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => {
  //const response = axios.get('/');

  return (
    <Admin dataProvider={dataProvider} >
      <Resource name="users" list={UserList} />
    </Admin>
  ) 
};

export default App;
