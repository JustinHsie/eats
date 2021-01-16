import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const CreateList = () => {
  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div className="p-float-label">
        <InputText id="title" />
        <label htmlFor="title">Title</label>
      </div>
      <div className="">
        <Button label="Add Place" />
      </div>
      <div className="">
        <Button label="Create List" />
      </div>
    </div>
  );
};
