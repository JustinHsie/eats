import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import { getLists } from '../../redux/actions';
import { ListCards } from '../../components/ListCards';
import { CreateListCard } from '../../components/CreateListCard';
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
    if (this.props.lists) {
      const cards = this.props.lists
        .slice(0)
        .reverse()
        .map(list => {
          return (
            <ListCards
              key={list.id}
              onClick={this.handleClickList(list.id)}
              listName={list.name}
              listDescription={list.description}
            />
          );
        });
      return (
        <div className="p-d-flex p-jc-center p-flex-wrap">
          {cards}
          <CreateListCard onClick={this.handleClickNew} />
        </div>
      );
    }
    return <CreateListCard onClick={this.handleClickNew} />;
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
