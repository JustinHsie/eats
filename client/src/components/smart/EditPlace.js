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
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import '../styles/EditPlace.css';

export class EditPlace extends React.Component {
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

  displayForm() {
    if (this.state.fetchedPlace && this.props.lists) {
      return (
        <div className="card p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mr-3 p-mr-lg-6">
            <h2>Edit {this.state.fetchedPlace.name}</h2>
            <h3>Name</h3>
            <InputText
              id="title"
              className="p-mb-2"
              value={this.state.name}
              onChange={this.handleSetState('name')}
            />

            <h3>Location</h3>
            <div className="form__input_text_max_width">
              <div className="p-inputgroup">
                <InputText
                  className="p-mb-2"
                  id="location"
                  value={this.state.location}
                  onChange={this.handleSetState('location')}
                />
                <Button
                  type="button"
                  className="p-mx-2 p-button-raised p-button-text p-button-rounded"
                  icon="pi pi-search"
                />
              </div>
            </div>

            <h3>Select List</h3>
            <div className="card">
              <Dropdown
                value={this.state.selectedList}
                options={this.props.lists}
                onChange={this.handleSetState('selectedList')}
                optionLabel="name"
                placeholder={this.state.selectedList.name}
              />
            </div>
          </div>
          <div>
            <div className="p-my-4">
              <h3>Rating</h3>
              <Rating
                value={this.state.rating}
                onChange={this.handleSetState('rating')}
              />
            </div>
            <div className="p-mt-3">
              <h3>Description</h3>
              <InputTextarea
                rows={5}
                cols={30}
                value={this.state.description}
                onChange={this.handleSetState('description')}
                autoResize
              />
            </div>
            <div>
              <Button
                type="submit"
                className="p-my-5 p-mr-6 p-button-success p-button-rounded"
                label="Save Changes"
              />
              <Button
                type="button"
                onClick={this.handleClickCancel}
                className="p-my-5 p-button-secondary p-button-rounded"
                label="Cancel"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h5>Loading...</h5>
      </div>
    );
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="p-m-6 p-d-flex p-jc-center">{this.displayForm()}</div>
      </form>
    );
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

export const ConnectEditPlace = connect(mapState, mapDispatch)(EditPlace);
