import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useHistory, useParams } from 'react-router-dom';
import { viewList as fakeList } from '../fakeData/viewList';
import { database } from '../fakeData/database';
import '../styles/ViewList.css';

export const ViewList = () => {
  const { id } = useParams();
  const list = database.lists.getItem(id);
  const history = useHistory();
  const [place, setPlace] = useState();

  const handleClickAddPlace = () => {
    history.push('/places/new');
  };

  const handleClickEditPlace = () => {
    history.push('/places/3');
  };

  const handleClickDeleteList = () => {
    history.push('/');
    database.lists.deleteItem(id);
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
          onClick={handleClickEditPlace}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div>
        <h2>{list.title}</h2>
        <p>{list.description}</p>
        <div className="card">
          <DataTable
            className="datatable_max_width"
            value={fakeList.places}
            selection={place}
            onSelectionChange={e => setPlace(e.value)}
            selectionMode="single"
            onRowSelect={handleClickEditPlace}
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
            onClick={handleClickDeleteList}
            className="p-button-danger p-button-rounded button_float_right"
            label="Delete List"
          />
        </div>
      </div>
    </div>
  );
};
