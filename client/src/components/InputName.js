import React from 'react';
import { InputText } from 'primereact/inputtext';

export function InputName(props) {
  return (
    <InputText
      value={props.value}
      onChange={props.onValueChange('name')}
      id="name"
      className="p-mb-2"
    />
  );
}
