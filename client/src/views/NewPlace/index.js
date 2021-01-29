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
      location: '',
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

  handleClickCancel = () => {
    history.push('/');
  };

  handleSetState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <PlaceForm
        onSubmit={this.handleSubmit}
        formTitle="Add Place"
        name={this.state.name}
        onNameChange={this.handleSetState}
        location={this.state.location}
        onLocationChange={this.handleSetState}
        selectedList={this.state.selectedList}
        lists={this.props.lists}
        onSelectedListChange={this.handleSetState}
        listPlaceholder={this.state.selectedList.name}
        rating={this.state.rating}
        onRatingChange={this.handleSetState}
        description={this.state.description}
        onDescriptionChange={this.handleSetState}
        buttonSubmitLabel="Add Place"
        onButtonCancelClick={this.handleClickCancel}
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
