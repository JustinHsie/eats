import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { database } from '../fakeData/database';
import '../styles/NewPlace.css';

export class NewPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      list: null,
      rating: null,
      description: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const place = {
      name: this.state.name,
      location: this.state.location,
      list: this.state.list,
      rating: this.state.rating,
      description: this.state.description,
    };
    const selectedList = place.list;
    const indexSelectedList = database.lists.db.findIndex(
      list => list === selectedList
    );
    selectedList.places.addItem(place);
    database.lists.editItem(indexSelectedList, selectedList);
    this.props.history.push('/');
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
                onChange={e => this.setState({ name: e.target.value })}
                id="placeName"
                className="p-mb-2"
              />

              <h3>Location</h3>
              <div className="form__input_text_max_width">
                <div className="p-inputgroup">
                  <InputText
                    value={this.state.location}
                    onChange={e => this.setState({ location: e.target.value })}
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
                  value={this.state.list}
                  options={database.lists.db}
                  onChange={e => this.setState({ list: e.target.value })}
                  optionLabel="title"
                  placeholder="Select a List"
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
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                  rows={5}
                  cols={30}
                  autoResize
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="p-my-5 p-button-success p-button-rounded"
                  label="Add Place"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
