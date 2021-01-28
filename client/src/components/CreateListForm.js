import React from 'react';
import { InputName } from './InputName';
import { InputDescription } from './InputDescription';
import { ButtonSubmit } from './ButtonSubmit';
import { ButtonCancel } from './ButtonCancel';

export function CreateListForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="p-m-6 p-d-flex p-jc-center">
        <div className="card">
          <h2>Create New List</h2>
          <label>
            <h3>Name</h3>
            <InputName
              state={props.state}
              handleSetState={props.handleSetState}
            />
          </label>

          <label>
            <h3>Description</h3>
            <InputDescription
              state={props.state}
              handleSetState={props.handleSetState}
            />
          </label>

          <div>
            <span className="p-mr-6">
              <ButtonSubmit label="Create List" />
            </span>
            <ButtonCancel handleClickCancel={props.handleClickCancel} />
          </div>
        </div>
      </div>
    </form>
  );
}
