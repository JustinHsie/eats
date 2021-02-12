import React from 'react';
import { Button } from 'primereact/button';
import { InputName } from './InputName';
import { InputDescription } from './InputDescription';

export function ViewListHeader(props) {
  return (
    <div className="p-d-flex ">
      <div>
        {props.listEditMode ? (
          <span>
            <div>
              <InputName
                value={props.currentListName}
                onValueChange={props.onNameChange}
              />
            </div>
            <div>
              <InputDescription
                value={props.currentListDescription}
                onValueChange={props.onDescriptionChange}
              />
            </div>
          </span>
        ) : (
          <span>
            <h2>{props.currentListName}</h2>
            <p>{props.currentListDescription}</p>
          </span>
        )}
      </div>
      <div>
        {props.listEditMode ? (
          <Button
            type="button"
            label="Save"
            onClick={props.onClickEditHeader}
            className="p-button-rounded p-button-warning p-ml-4 p-mt-5"
          />
        ) : (
          <Button
            type="button"
            icon="pi pi-pencil"
            onClick={props.onClickEditHeader}
            className="p-button-rounded p-button-info p-ml-4 p-mt-5"
          />
        )}
      </div>
    </div>
  );
}
