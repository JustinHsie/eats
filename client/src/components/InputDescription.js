import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export function InputDescription(props) {
  return (
    <InputTextarea
      value={props.state.description}
      onChange={props.handleSetState('description')}
      rows={5}
      cols={30}
      autoResize
      className="p-mb-2"
    />
  );
}
