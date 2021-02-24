import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export function InputDescription(props) {
  return (
    <InputTextarea
      value={props.value}
      onChange={props.onValueChange}
      rows={5}
      cols={25}
      autoResize
      className="p-mb-2"
    />
  );
}
