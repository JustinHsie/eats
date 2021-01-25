import React from 'react';
import { connect } from 'react-redux';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Lists from './Lists';
import '../styles/App.css';

export class App extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className="p-m-4">
        <div className="p-m-6">
          <Lists {...props} />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export const connectApp = connect(mapState)(App);
