import React from 'react';
import { Button } from 'primereact/button';

export function IconButtonsEditDelete(props) {
  return (
    <React.Fragment>
      <Button
        type="button"
        icon="pi pi-trash"
        onClick={props.onClickDelete}
        className="p-button-rounded p-button-warning p-ml-2 button_float_right"
      />
      <Button
        type="button"
        icon="pi pi-pencil"
        onClick={props.onClickEdit}
        className="p-button-rounded p-button-info button_float_right"
      />
    </React.Fragment>
  );
}
