import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import {
  getLists,
  createPlace,
  addPlaceToList,
  setMenuTab,
} from '../../redux/actions';
import { PlaceForm } from '../../components/PlaceForm';
import './index.css';

class NewPlaceClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: {},
      locationInput: '',
      mapCenter: null,
      rating: null,
      description: '',
      selectedList: null,
    };
    this.props.setMenuTab('New Place');
  }

  componentDidMount() {
    this.props.getLists();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createPlace(
      this.state.name,
      this.state.rating,
      this.state.description,
      this.state.location,
      this.state.selectedList
    );
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePlaceSelect = e => {
    const location = {
      name: e.name,
      placeId: e.place_id,
      address: e.formatted_address,
      mapCenter: {
        lat: e.geometry.location.lat(),
        lng: e.geometry.location.lng(),
      },
    };

    this.setState({
      location,
      locationInput: location.address,
      mapCenter: location.mapCenter,
    });
  };

  handleLocationInputChange = e => {
    this.setState({ locationInput: e.target.value });
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
    history.push('/');
  };

  render() {
    return (
      <PlaceForm
        onSubmit={this.handleSubmit}
        formTitle="Add Place"
        name={this.state.name}
        onNameChange={this.handleNameChange}
        onPlaceSelect={this.handlePlaceSelect}
        locationInput={this.state.locationInput}
        onLocationInputChange={this.handleLocationInputChange}
        selectedList={this.state.selectedList}
        lists={this.props.lists}
        onSelectedListChange={this.handleSelectedListChange}
        rating={this.state.rating}
        onRatingChange={this.handleRatingChange}
        description={this.state.description}
        onDescriptionChange={this.handleDescriptionChange}
        buttonSubmitLabel="Add Place"
        onButtonCancelClick={this.handleClickCancel}
        mapCenter={this.state.mapCenter}
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
  createPlace,
  addPlaceToList,
  setMenuTab,
};

export const NewPlace = connect(mapState, mapDispatch)(NewPlaceClass);
