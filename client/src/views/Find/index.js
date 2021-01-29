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

  handleSelectedListChange = e => {
    this.setState({ selectedList: e.value });
  };

  render() {
    return (
      <FindComponent
        selectedList={this.state.selectedList}
        onSelectedListChange={this.handleSelectedListChange}
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
