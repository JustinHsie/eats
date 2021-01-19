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
    this.state = { list: null, rating: null };
  }

  render() {
    return (
      <div className="p-m-6 p-d-flex p-jc-center">
        <div className="card p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mr-3 p-mr-lg-6">
            <h2>Add Place</h2>
            <h3>Name</h3>
            <InputText id="placeName" className="p-mb-2" />

            <h3>Location</h3>
            <div className="form__input_text_max_width">
              <div className="p-inputgroup">
                <InputText className="p-mb-2" id="title" />
                <Button
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
                onChange={e => this.setState({ list: e.value })}
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
                onChange={e => this.setState({ rating: e.value })}
              />
            </div>
            <div className="p-mt-3">
              <h3>Description</h3>
              <InputTextarea rows={5} cols={30} autoResize />
            </div>
            <div>
              <Button
                className="p-my-5 p-button-success p-button-rounded"
                label="Add Place"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
