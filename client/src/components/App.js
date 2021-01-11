import React from 'react';
import axios from 'axios';

const App = () => {
  const response = axios.get('/');

  return (
    <div>
      App
      {console.log(response)}
    </div>
  );
};

export default App;
