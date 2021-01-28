import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import {
  getPlace,
  getLists,
  updatePlace,
  addPlaceToList,
  removePlaceFromList,
} from '../../redux/actions';
import { PlaceForm } from '../../components/PlaceForm';
import { Loading } from '../../components/Loading';
import './index.css';

class EditPlaceClass extends React.Component {
  constructor(props) {
    super(props);
    this.placeId = this.props.match.params.id;
    this.state = {
      fetchedPlace: null,
      name: '',
      rating: null,
      description: '',
      location: '',
      selectedList: null,
    };
  }

  componentDidMount() {
    this.props.getPlace(this.placeId);
    this.props.getLists();
  }

  componentDidUpdate(prevProps) {
    if (this.props.place !== prevProps.place) {
      this.setFetchedPlace();
    }
  }

  setFetchedPlace = () => {
    const fetchedPlace = this.props.place;
    if (fetchedPlace) {
      this.setState({
        fetchedPlace,
        name: fetchedPlace.name,
        rating: fetchedPlace.rating,
        description: fetchedPlace.description,
        location: fetchedPlace.location,
        selectedList: fetchedPlace.list,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updatePlace(
      this.state.fetchedPlace.id,
      this.state.name,
      this.state.rating,
      this.state.description,
      this.state.location,
      this.state.selectedList
    );
    this.props.addPlaceToList(
      this.state.selectedList.id,
      this.state.fetchedPlace.id
    );
    this.props.removePlaceFromList(
      this.state.fetchedPlace.list.id,
      this.state.fetchedPlace.id
    );
  };

  handleSetState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleClickCancel = () => {
    history.push(`/lists/${this.state.fetchedPlace.list.id}`);
  };

  render() {
    if (this.state.fetchedPlace && this.props.lists) {
      return (
        <PlaceForm
          state={this.state}
          handleSetState={this.handleSetState}
          handleSubmit={this.handleSubmit}
          handleClickCancel={this.handleClickCancel}
          lists={this.props.lists}
          formTitle={`Edit ${this.state.fetchedPlace.name}`}
          buttonSubmitLabel="Save Changes"
          listPlaceholder={this.state.selectedList.name}
        />
      );
    }
    return <Loading />;
  }
}

function mapState(state) {
  const { places, lists } = state;
  return { place: places.place, lists: lists.allLists };
}

const mapDispatch = {
  getPlace,
  getLists,
  updatePlace,
  addPlaceToList,
  removePlaceFromList,
};

export const EditPlace = connect(mapState, mapDispatch)(EditPlaceClass);
