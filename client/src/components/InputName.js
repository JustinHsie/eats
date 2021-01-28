import React from 'react';
import { InputText } from 'primereact/inputtext';

export function InputName(props) {
  return (
    <InputText
      value={props.state.name}
      onChange={props.handleSetState('name')}
      id="name"
      className="p-mb-2"
    />
  );
}
