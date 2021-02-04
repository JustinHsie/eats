import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Autocomplete } from './Autocomplete';

export function InputLocation(props) {
  return (
    <div className="p-inputgroup p-mb-2">
      <Autocomplete onPlaceSelected={props.onPlaceSelected} />
      <Button
        type="button"
        className="p-mx-2 p-button-raised p-button-text p-button-rounded"
        icon="pi pi-search"
      />
    </div>
  );
}
