import React from 'react';
import { connect } from 'react-redux';
import { Lists } from '../Lists';
import './index.css';

class HomeClass extends React.Component {
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

export const Home = connect(mapState)(HomeClass);
