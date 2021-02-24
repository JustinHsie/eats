import React from 'react';
import { ButtonCancel } from './ButtonCancel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export function PlacesTable(props) {
  return (
    <div>
      <div className="card">
        <DataTable
          className="datatable_max_width"
          value={props.currentListPlaces}
          selection={props.selectedPlace}
          onSelectionChange={props.onSelectionChange}
          selectionMode="single"
          onRowSelect={props.onRowSelect}
        >
          <Column field="name" header="Name"></Column>
          <Column body={props.actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <div className="datatable_max_width p-my-6">
        <span className="p-mr-6">
          <Button
            type="button"
            onClick={props.onCancelClick}
            className="p-my-5 p-button-outlined p-button-secondary p-button-rounded"
            label="Back"
          />
        </span>
        <Button
          type="button"
          className="p-button-info p-button-rounded p-my-5 p-ml-6 button_float_right"
          label="Add New Place"
          onClick={props.onNewPlaceClick}
        />
      </div>
    </div>
  );
}
