import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import {
  getList,
  updateList,
  deleteList,
  deletePlace,
  setMenuTab,
} from '../../redux/actions';
import { PlacesTable } from '../../components/PlacesTable';
import { ViewListHeader } from '../../components/ViewListHeader';
import { Loading } from '../../components/Loading';
import { IconButtonsEditDelete } from '../../components/IconButtonsEditDelete';
import './index.css';

class ViewListClass extends React.Component {
  constructor(props) {
    super(props);
    this.listId = this.props.match.params.id;
    this.state = {
      listName: '',
      listDescription: '',
      listEditMode: false,
      place: null,
    };
    this.props.setMenuTab('Home');
  }

  componentDidMount() {
    this.props.getList(this.listId);
  }

  componentDidUpdate(prevProps) {
    // Display list name after fetching list
    if (this.props.currentList !== prevProps.currentList) {
      this.setState({
        listName: this.props.currentList.name,
        listDescription: this.props.currentList.description,
      });
    }
    // Refetch list after deleting place
    if (this.props.deletedPlace !== prevProps.deletedPlace) {
      this.props.getList(this.listId);
    }
  }

  handleClickEditHeader = () => {
    if (!this.state.listEditMode) {
      this.setState({ listEditMode: true });
    } else {
      this.setState({ listEditMode: false });

      // Update if changed
      if (
        this.props.currentList.name !== this.state.listName ||
        this.props.currentList.description !== this.state.listDescription
      ) {
        this.props.updateList(
          this.listId,
          this.state.listName,
          this.state.listDescription
        );
      }
    }
  };

  handleNameChange = e => {
    this.setState({ listName: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ listDescription: e.target.value });
  };

  handleSelectionChange = e => {
    this.setState({ place: e.value });
  };

  handleRowSelect = e => {
    history.push(`/places/${e.data.id}`);
  };

  handleClickDeletePlace = placeObject => e => {
    e.stopPropagation();
    this.props.deletePlace(placeObject.id, this.listId);
  };

  handleClickEditPlace = placeObject => e => {
    e.stopPropagation();
    history.push(`/places/${placeObject.id}`);
  };

  actionBodyTemplate = placeObject => {
    return (
      <IconButtonsEditDelete
        onClickDelete={this.handleClickDeletePlace(placeObject)}
        onClickEdit={this.handleClickEditPlace(placeObject)}
      />
    );
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
        <div className="p-m-6 p-d-flex p-jc-center">
          <div>
            <ViewListHeader
              listEditMode={this.state.listEditMode}
              currentListName={this.state.listName}
              currentListDescription={this.state.listDescription}
              onClickEditHeader={this.handleClickEditHeader}
              onNameChange={this.handleNameChange}
              onDescriptionChange={this.handleDescriptionChange}
            />
            <PlacesTable
              currentListPlaces={this.props.currentList.places}
              selectedPlace={this.state.place}
              onSelectionChange={this.handleSelectionChange}
              onRowSelect={this.handleRowSelect}
              onDeletePlaceClick={this.handleClickDeletePlace}
              onEditPlaceClick={this.handleClickEditPlace}
              actionBodyTemplate={this.actionBodyTemplate}
              onNewPlaceClick={this.handleClickNewPlace}
              onDeleteListClick={this.handleClickDeleteList}
            />
          </div>
        </div>
      );
    }
    return <Loading />;
  }
}

function mapState(state) {
  const { lists, places } = state;
  return { currentList: lists.list, deletedPlace: places.deletedPlace };
}

const mapDispatch = {
  getList,
  updateList,
  deleteList,
  deletePlace,
  setMenuTab,
};

export const ViewList = connect(mapState, mapDispatch)(ViewListClass);
