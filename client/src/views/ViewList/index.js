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
import { PlacesTable } from '../../components/PlacesTable';
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

  handleSelectionChange = e => {
    this.setState({ place: e.value });
  };

  handleRowSelect = e => {
    history.push(`/places/${e.data.id}`);
  };

  handleClickDeletePlace = placeObject => e => {
    console.log(e)
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

  handleClickDeleteList = () => {
    this.props.deleteList(this.listId);
  };

  render() {
    if (this.props.currentList) {
      return (
        <PlacesTable
          currentListName={this.props.currentList.name}
          currentListDescription={this.props.currentList.description}
          currentListPlaces={this.props.currentList.places}
          selectedPlace={this.state.place}
          onSelectionChange={this.handleSelectionChange}
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
