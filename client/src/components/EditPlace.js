import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { lists as fakeLists } from '../fakeData/lists';
import { place as fakePlace } from '../fakeData/place';
import '../styles/NewPlace.css';

export const EditPlace = () => {
  const history = useHistory();
  const [list, setList] = useState('');
  const [rating, setRating] = useState(fakePlace.rating);

  const onListChange = e => {
    setList(e.value);
  };
  const handleClickCancel = () => {
    history.push('/lists/0');
  }
  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div className="card p-d-flex p-flex-column p-flex-md-row">
        <div className="p-mr-3 p-mr-lg-6">
          <h2>Edit {fakePlace.name}</h2>
          <h3>Name</h3>
          <InputText
            id="title"
            className="p-mb-2"
            placeholder={fakePlace.name}
          />

          <h3>Location</h3>
          <div className="form__input_text_max_width">
            <div className="p-inputgroup">
              <InputText
                className="p-mb-2"
                id="title"
                placeholder={fakePlace.location}
              />
              <Button
                className="p-mx-2 p-button-raised p-button-text p-button-rounded"
                icon="pi pi-search"
              />
            </div>
          </div>

          <h3>Select List</h3>
          <div className="card">
            <Dropdown
              value={list}
              options={fakeLists}
              onChange={onListChange}
              optionLabel="name"
              placeholder={fakePlace.list}
            />
          </div>
        </div>
        <div>
          <div className="p-my-4">
            <h3>Rating</h3>
            <Rating value={rating} onChange={e => setRating(e.value)} />
          </div>
          <div className="p-mt-3">
            <h3>Description</h3>
            <InputTextarea
              rows={5}
              cols={30}
              value={fakePlace.description}
              autoResize
            />
          </div>
          <div>
            <Button
              className="p-my-5 p-mr-6 p-button-success p-button-rounded"
              label="Save Changes"
            />
            <Button
              onClick={handleClickCancel}
              className="p-my-5 p-button-secondary p-button-rounded"
              label="Cancel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
