import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import { getLists, createPlace, addPlaceToList } from '../../redux/actions';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import '../styles/NewPlace.css';

export class NewPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      rating: null,
      description: '',
      selectedList: null,
      lists: [],
    };
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
      <form onSubmit={this.handleSubmit}>
        <div className="p-m-6 p-d-flex p-jc-center">
          <div className="card p-d-flex p-flex-column p-flex-md-row">
            <div className="p-mr-3 p-mr-lg-6">
              <h2>Add Place</h2>
              <h3>Name</h3>
              <InputText
                value={this.state.name}
                onChange={this.handleSetState('name')}
                id="placeName"
                className="p-mb-2"
              />

              <h3>Location</h3>
              <div className="form__input_text_max_width">
                <div className="p-inputgroup">
                  <InputText
                    value={this.state.location}
                    onChange={this.handleSetState('location')}
                    className="p-mb-2"
                    id="location"
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
                  placeholder="Select a List"
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
                  value={this.state.description}
                  onChange={this.handleSetState('description')}
                  rows={5}
                  cols={30}
                  autoResize
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="p-my-5 p-mr-6 p-button-success p-button-rounded"
                  label="Add Place"
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
        </div>
      </form>
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
};

export const ConnectNewPlace = connect(mapState, mapDispatch)(NewPlace);