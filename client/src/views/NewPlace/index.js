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
        state={this.state}
        handleSetState={this.handleSetState}
        handleSubmit={this.handleSubmit}
        handleClickCancel={this.handleClickCancel}
        lists={this.props.lists}
        formTitle="Add Place"
        buttonSubmitLabel="Add Place"
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
