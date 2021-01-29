import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import {
  getList,
  deleteList,
  deletePlace,
  removePlaceFromList,
  setMenuTab,
} from '../../redux/actions';
import { ListsTable } from '../../components/ListsTable';
import { Loading } from '../../components/Loading';
import './index.css';

class ViewListClass extends React.Component {
  constructor(props) {
    super(props);
    this.listId = this.props.match.params.id;
    this.state = { place: null };
    this.props.setMenuTab('Home');
  }

  componentDidMount() {
    this.props.getList(this.listId);
  }

  handleClickDeleteList = () => {
    this.props.deleteList(this.listId);
  };

  handleClickDeletePlace = placeObject => e => {
    e.stopPropagation();
    this.props.deletePlace(placeObject.id);
    this.props.removePlaceFromList(placeObject.list.id, placeObject.id);
  };

  handleClickEditPlace = e => {
    history.push(`/places/${e.id}`);
  };

  handleClickNewPlace = () => {
    history.push('/places/new');
  };

  handleRowSelect = e => {
    history.push(`/places/${e.data.id}`);
  };

  handleSetState = key => e => {
    this.setState({ [key]: e.value });
  };

  render() {
    if (this.props.currentList) {
      return (
        <ListsTable
          currentListName={this.props.currentList.name}
          currentListDescription={this.props.currentList.description}
          currentListPlaces={this.props.currentList.places}
          selectedPlace={this.state.place}
          onSelectionChange={this.handleSetState}
          onRowSelect={this.handleRowSelect}
          onDeletePlaceClick={this.handleClickDeletePlace}
          onEditPlaceClick={this.handleClickEditPlace}
          onNewPlaceClick={this.handleClickNewPlace}
          onDeleteListClick={this.handleClickDeleteList}
        />
      );
    }
    return <Loading />;
  }
}

function mapState(state) {
  const { lists } = state;
  return { currentList: lists.list };
}

const mapDispatch = {
  getList,
  deleteList,
  deletePlace,
  removePlaceFromList,
  setMenuTab,
};

export const ViewList = connect(mapState, mapDispatch)(ViewListClass);
