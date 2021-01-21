import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { db } from '../fakeData/db';
import '../styles/NewPlace.css';

export class EditPlace extends React.Component {
  constructor(props) {
    super(props);
    this.placeId = this.props.match.params.id;
    this.state = {
      name: '',
      location: '',
      rating: null,
      description: '',
      selectedList: null,
      lists: [],
      currentPlace: null,
    };
  }

  componentDidMount() {
    this.getCurrentPlace();
    this.getLists();
  }

  getCurrentPlace = async () => {
    const currentPlace = await db.getPlace(this.placeId);
    this.setState({
      currentPlace,
      name: currentPlace.name,
      location: currentPlace.location,
      rating: currentPlace.rating,
      description: currentPlace.description,
      selectedList: currentPlace.list,
    });
  };

  getLists = async () => {
    const lists = await db.getLists();
    this.setState({ lists });
  };

  handleClickCancel = () => {
    this.props.history.push(`/lists/${this.state.currentPlace.list.id}`);
  };

  handleSubmit = async e => {
    e.preventDefault();

    await db.updatePlace(
      this.placeId,
      this.state.name,
      this.state.rating,
      this.state.description,
      this.state.location,
      this.state.selectedList
    );
    await db.addPlaceToList(this.state.selectedList.id, this.placeId);
    await db.removePlaceFromList(this.state.currentPlace.list.id, this.placeId);

    this.props.history.push(`/lists/${this.state.currentPlace.list.id}`);
  };

  displayForm = () => {
    if (this.state.currentPlace) {
      return (
        <div className="card p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mr-3 p-mr-lg-6">
            <h2>Edit {this.state.currentPlace.name}</h2>
            <h3>Name</h3>
            <InputText
              id="title"
              className="p-mb-2"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />

            <h3>Location</h3>
            <div className="form__input_text_max_width">
              <div className="p-inputgroup">
                <InputText
                  className="p-mb-2"
                  id="location"
                  value={this.state.location}
                  onChange={e => this.setState({ location: e.target.value })}
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
                options={this.state.lists}
                onChange={e => this.setState({ selectedList: e.target.value })}
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
                onChange={e => this.setState({ rating: e.target.value })}
              />
            </div>
            <div className="p-mt-3">
              <h3>Description</h3>
              <InputTextarea
                rows={5}
                cols={30}
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
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
  };
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div className="p-m-6 p-d-flex p-jc-center">{this.displayForm()}</div>
      </form>
    );
  }
}
