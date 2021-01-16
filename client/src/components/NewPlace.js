import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { lists as fakeLists } from '../fakeData/lists';
import '../styles/NewPlace.css';

export const NewPlace = () => {
  const [list, setList] = useState(null);
  const onListChange = e => {
    setList(e.value);
  };
  return (
    <div className="p-m-6">
      <div className="card">
        <h2>Add New Place</h2>
        <h3>Name</h3>
        <InputText id="title" className="p-mb-2" />

        <h3>Location</h3>
        <div className="form__input_text_max_width">
          <div className="p-inputgroup">
            <InputText id="title" placeholder="Search" />
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
            placeholder="Select a List"
          />
        </div>
      </div>

      <Button
        className="p-my-5 p-button-success p-button-rounded"
        label="Add Place"
      />
    </div>
  );
};
