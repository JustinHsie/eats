import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Lists } from './Lists';
import '../styles/App.css';

export const App = () => {
  return (
    <div className="p-m-4">
      <div className="p-m-6">
        <Lists />
      </div>
    </div>
  );
};
