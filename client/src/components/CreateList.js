import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { database } from '../fakeData/database';

export const CreateList = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const list = { title: title, description: description };
    database.addItem(list);
    history.push('/');
  };

  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div className="card">
        <h2>Create New List</h2>

        <form onSubmit={handleSubmit}>
          <label>
            <h3>Title</h3>
            <InputText
              value={title}
              onChange={e => setTitle(e.target.value)}
              id="listTitle"
              className="p-mb-2"
            />
          </label>

          <label>
            <h3>Description</h3>
            <InputTextarea
              rows={5}
              cols={30}
              value={description}
              onChange={e => setDescription(e.target.value)}
              autoResize
            />
          </label>

          <div>
            <Button
              className="p-my-5 p-button-rounded p-mr-6"
              label="Add Place"
            />
            <Button
              className="p-my-5 p-button-success p-button-rounded"
              label="Create List"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
