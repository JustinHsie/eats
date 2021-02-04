import React from 'react';
import { InputName } from './InputName';
import { InputLocation } from './InputLocation';
import { SelectListDropdown } from './SelectListDropdown';
import { Rating } from './Rating';
import { InputDescription } from './InputDescription';
import { ButtonSubmit } from './ButtonSubmit';
import { ButtonCancel } from './ButtonCancel';
import { Map } from '../components/Map';
import { Autocomplete } from './Autocomplete';

export function PlaceForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="p-m-6">
        <div className="p-m-6 p-d-flex p-jc-center">
          <div className="card p-d-flex p-flex-column p-flex-md-row">
            <div className="p-mr-3 p-mr-lg-6">
              <h2>{props.formTitle}</h2>
              <label>
                <h3>Name</h3>
                <InputName
                  value={props.name}
                  onValueChange={props.onNameChange}
                />
              </label>

              <label>
                <h3>Location</h3>
                <div className="form__input_text_max_width">
                  <InputLocation
                    onPlaceSelected={props.onPlaceSelected}
                  />
                </div>
              </label>

              <h3>Select List</h3>
              <div className="card">
                <SelectListDropdown
                  selected={props.selectedList}
                  lists={props.lists}
                  onSelectChange={props.onSelectedListChange}
                  placeholder={props.listPlaceholder}
                />
              </div>
            </div>
            <div>
              <h3>Rating</h3>
              <Rating
                rating={props.rating}
                onRatingChange={props.onRatingChange}
              />

              <label>
                <h3>Description</h3>
                <InputDescription
                  value={props.description}
                  onValueChange={props.onDescriptionChange}
                />
              </label>

              <div>
                <span className="p-mr-6">
                  <ButtonSubmit label={props.buttonSubmitLabel} />
                </span>
                <ButtonCancel onClick={props.onButtonCancelClick} />
              </div>
            </div>
          </div>
        </div>
        <Map />
      </div>
    </form>
  );
}