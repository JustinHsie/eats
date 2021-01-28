import React from 'react';
import { InputName } from './InputName';
import { InputLocation } from './InputLocation';
import { SelectListDropdown } from './SelectListDropdown';
import { Rating } from './Rating';
import { InputDescription } from './InputDescription';
import { ButtonSubmit } from './ButtonSubmit';
import { ButtonCancel } from './ButtonCancel';

export function PlaceForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="p-m-6 p-d-flex p-jc-center">
        <div className="card p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mr-3 p-mr-lg-6">
            <h2>{props.formTitle}</h2>
            <label>
              <h3>Name</h3>
              <InputName
                state={props.state}
                handleSetState={props.handleSetState}
              />
            </label>

            <label>
              <h3>Location</h3>
              <div className="form__input_text_max_width">
                <InputLocation
                  state={props.state}
                  handleSetState={props.handleSetState}
                />
              </div>
            </label>

            <h3>Select List</h3>
            <div className="card">
              <SelectListDropdown
                state={props.state}
                handleSetState={props.handleSetState}
                lists={props.lists}
                placeholder={props.listPlaceholder}
              />
            </div>
          </div>
          <div>
            <h3>Rating</h3>
            <Rating state={props.state} handleSetState={props.handleSetState} />

            <label>
              <h3>Description</h3>
              <InputDescription
                state={props.state}
                handleSetState={props.handleSetState}
              />
            </label>

            <div>
              <span className="p-mr-6">
                <ButtonSubmit label={props.buttonSubmitLabel} />
              </span>
              <ButtonCancel handleClickCancel={props.handleClickCancel} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
