import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const CreateList = () => {
  const [description, setDescription] = useState('');
  return (
    <div className="p-m-6">
      <div className="card">
        <h2>Create New List</h2>
        <h3>Title</h3>
        <InputText id="title" className="p-mb-2" />

        <h3>Description</h3>
        <InputTextarea
          rows={5}
          cols={30}
          value={description}
          onChange={e => setDescription(e.target.value)}
          autoResize
        />
        <div>
          <Button
            className="p-my-5 p-button-success p-button-rounded"
            label="Create List"
          />
        </div>
      </div>
    </div>
  );
};
