import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useHistory } from 'react-router-dom';
import { viewList as fakeList } from '../fakeData/viewList';
import '../styles/ViewList.css';

export const ViewList = () => {
  const history = useHistory();
  const handleClickAddPlace = () => {
    history.push('/places/new');
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  return (
    <div className="p-m-6">
      <h2>{fakeList.title}</h2>
      <div className="card">
        <DataTable
          className="datatable_max_width"
          editMode="row"
          value={fakeList.places}
        >
          <Column field="name" header="Name"></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <div className="datatable_max_width p-my-6">
        <Button
          className="p-button-rounded"
          label="Add New Place"
          onClick={handleClickAddPlace}
        />
        <Button
          className="p-button-danger p-button-rounded button_float_right"
          label="Delete List"
        />
      </div>
    </div>
  );
};
