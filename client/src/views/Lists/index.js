import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import { getLists } from '../../redux/actions';
import { ListCards } from '../../components/ListCards';
import './index.css';

class ListsClass extends React.Component {
  componentDidMount() {
    this.props.getLists();
  }

  handleClickList = listId => () => {
    history.push(`/lists/${listId}`);
  };

  handleClickNew = () => {
    history.push('/lists/new');
  };

  render() {
    return (
      <ListCards
        lists={this.props.lists}
        handleClickList={this.handleClickList}
        handleClickNew={this.handleClickNew}
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
};

export const Lists = connect(mapState, mapDispatch)(ListsClass);
