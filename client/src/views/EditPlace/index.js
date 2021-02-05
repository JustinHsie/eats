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
      location: {},
      locationName: '',
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
        locationName: fetchedPlace.location.name,
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

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePlaceSelect = e => {
    const location = {
      name: e.name,
      placeId: e.place_id,
    };
    this.setState({ location, locationName: location.name });
  };

  handleLocationChange = e => {
    this.setState({ locationName: e.target.value });
  };

  handleSelectedListChange = e => {
    this.setState({ selectedList: e.target.value });
  };

  handleRatingChange = e => {
    this.setState({ rating: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleClickCancel = () => {
    history.push(`/lists/${this.state.fetchedPlace.list.id}`);
  };

  render() {
    if (this.state.fetchedPlace && this.props.lists) {
      return (
        <PlaceForm
          onSubmit={this.handleSubmit}
          formTitle={`Edit ${this.state.fetchedPlace.name}`}
          name={this.state.name}
          onNameChange={this.handleNameChange}
          onPlaceSelect={this.handlePlaceSelect}
          locationName={this.state.locationName}
          onLocationChange={this.handleLocationChange}
          selectedList={this.state.selectedList}
          lists={this.props.lists}
          onSelectedListChange={this.handleSelectedListChange}
          listPlaceholder={this.state.selectedList.name}
          rating={this.state.rating}
          onRatingChange={this.handleRatingChange}
          description={this.state.description}
          onDescriptionChange={this.handleDescriptionChange}
          buttonSubmitLabel="Save Changes"
          onButtonCancelClick={this.handleClickCancel}
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
