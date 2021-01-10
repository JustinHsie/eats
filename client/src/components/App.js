import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserList from './UserList';
import PostList from './PostList';
import MyLayout from './MyLayout';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => {

  return (
    <Admin layout={MyLayout} dataProvider={dataProvider} >
      <Resource name="users" list={UserList} />
      <Resource name="posts" list={PostList} />
    </Admin>
  ) 
};

export default App;
