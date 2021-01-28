import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export function ListsTable(props) {
  const actionBodyTemplate = placeObject => {
    return (
      <React.Fragment>
        <Button
          type="button"
          onClick={props.handleClickDeletePlace(placeObject)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
          type="button"
          onClick={props.handleClickEdit}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div>
        <h2>{props.currentList.name}</h2>
        <p>{props.currentList.description}</p>
        <div className="card">
          <DataTable
            className="datatable_max_width"
            value={props.currentList.places}
            selection={props.state.place}
            onSelectionChange={props.handleSetState('place')}
            selectionMode="single"
            onRowSelect={props.handleRowSelect}
          >
            <Column field="name" header="Name"></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <div className="datatable_max_width p-my-6">
          <Button
            type="button"
            className="p-button-rounded"
            label="Add New Place"
            onClick={props.handleClickNewPlace}
          />
          <Button
            type="button"
            onClick={props.handleClickDeleteList}
            className="p-button-danger p-button-rounded button_float_right"
            label="Delete List"
          />
        </div>
      </div>
    </div>
  );
}
