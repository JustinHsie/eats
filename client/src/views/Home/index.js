import React from 'react';
import { connect } from 'react-redux';
import { setMenuTab } from '../../redux/actions';
import { Lists } from '../Lists';
import './index.css';

class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.props.setMenuTab('Home');
  }
  render() {
    return (
      <div className="p-m-4">
        <div className="p-m-6">
          <Lists {...this.props} />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

const mapDispatch = {
  setMenuTab,
};

export const Home = connect(mapState, mapDispatch)(HomeClass);
