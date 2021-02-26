import React from 'react';
import { Autocomplete } from './Autocomplete';

export function InputLocation(props) {
  return (
    <span className="p-mb-2">
      <Autocomplete
        onPlaceSelect={props.onPlaceSelect}
        locationInput={props.locationInput}
        onLocationInputChange={props.onLocationInputChange}
      />
      {props.isLocationSelected ? null : (
        <small id="select-location-help" className="p-error p-d-block">
          Please select a location
        </small>
      )}
    </span>
  );
}
