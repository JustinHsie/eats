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
          onClick={props.onDeletePlaceClick(placeObject)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
          type="button"
          onClick={props.onEditPlaceClick}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div>
        <h2>{props.currentListName}</h2>
        <p>{props.currentListDescription}</p>
        <div className="card">
          <DataTable
            className="datatable_max_width"
            value={props.currentListPlaces}
            selection={props.selectedPlace}
            onSelectionChange={props.onSelectionChange('place')}
            selectionMode="single"
            onRowSelect={props.onRowSelect}
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
            onClick={props.onNewPlaceClick}
          />
          <Button
            type="button"
            onClick={props.onDeleteListClick}
            className="p-button-danger p-button-rounded button_float_right"
            label="Delete List"
          />
        </div>
      </div>
    </div>
  );
}
