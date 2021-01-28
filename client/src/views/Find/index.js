import React from 'react';
import { connect } from 'react-redux';
import { getLists, setMenuTab } from '../../redux/actions';
import { Find as FindComponent } from '../../components/Find';
import './index.css';

class FindClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedList: null };
    this.props.setMenuTab('Find Near Me');
  }

  componentDidMount() {
    this.props.getLists();
  }

  handleSetState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <FindComponent
        state={this.state}
        handleSetState={this.handleSetState}
        lists={this.props.lists}
      />
    );
  }
}

function mapState(state) {
  const { lists } = state;
  return { lists: lists.allLists };
}

const mapDispatch = {
  getLists,
  setMenuTab,
};

export const Find = connect(mapState, mapDispatch)(FindClass);
