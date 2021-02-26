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
          <div>
          <div>
            <Button
              type="button"
              onClick={props.onDeleteListClick}
              className="p-button-outlined p-button-danger p-button-rounded p-ml-6 p-mb-6 button_float_right"
              label="Delete List"
            />
            </div>
            <div>
            <Button
              type="button"
              label="Save"
              onClick={props.onClickEditHeader}
              className="p-button-rounded p-button-warning p-ml-6 p-mt-6 button_float_right"
            />
          </div>
          </div>
        ) : (
          <Button
            type="button"
            icon="pi pi-pencil"
            onClick={props.onClickEditHeader}
            className="p-button-rounded p-button-outlined p-button-info p-ml-4 p-mt-5"
          />
        )}
      </div>
    </div>
  );
}
