import React from 'react';
import { Button } from 'primereact/button';

export function ButtonCancel(props) {
  return (
    <Button
      type="button"
      onClick={props.onClick}
      className="p-my-5 p-button-outlined p-button-secondary p-button-rounded"
      label="Cancel"
    />
  );
}
