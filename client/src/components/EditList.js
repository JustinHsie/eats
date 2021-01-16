import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { places as fakePlaces } from '../fakeData/places';

export const EditList = () => {
  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
        />
      </React.Fragment>
    );
  };
  return (
    <div>
      <div className="p-float-label">
        <InputText id="title" />
        <label htmlFor="title">Title</label>
      </div>
      <div className="card">
        <DataTable editMode="row" value={fakePlaces}>
          <Column field="name" header="Name"></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <div className="p-inputgroup">
        <Button label="Add Place" />
      </div>
      <div className="p-inputgroup">
        <Button label="Submit" />
      </div>
    </div>
  );
};
