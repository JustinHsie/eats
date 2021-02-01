import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export function InputLocation(props) {
  return (
    <div className="p-inputgroup">
      <InputText
        value={props.location}
        onChange={props.onLocationChange}
        className="p-mb-2"
        id="location"
      />
      <Button
        type="button"
        className="p-mx-2 p-button-raised p-button-text p-button-rounded"
        icon="pi pi-search"
      />
    </div>
  );
}
