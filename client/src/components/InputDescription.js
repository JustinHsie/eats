import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export function InputDescription(props) {
  return (
    <InputTextarea
      value={props.value}
      onChange={props.onValueChange('description')}
      rows={5}
      cols={30}
      autoResize
      className="p-mb-2"
    />
  );
}
