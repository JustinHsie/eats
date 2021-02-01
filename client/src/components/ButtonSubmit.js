import React from 'react';
import { Button } from 'primereact/button';

export function ButtonSubmit(props) {
  return (
    <Button
      type="submit"
      className="p-my-5 p-button-success p-button-rounded"
      label={props.label}
    />
  );
}
