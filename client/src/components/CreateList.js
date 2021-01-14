import React from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const CreateList = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div className="p-float-label">
        <InputText id="title" />
        <label htmlFor="title">Title</label>
      </div>
      <div className="p-inputgroup">
        <Button label="Add Place" />
      </div>
      <div className="p-inputgroup">
        <Button label="Create List" />
      </div>
    </div>
  );
};
