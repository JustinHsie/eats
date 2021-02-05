import React from 'react';
import { Autocomplete } from './Autocomplete';

export function InputLocation(props) {
  return (
    <div className="p-mb-2">
      <Autocomplete
        onPlaceSelect={props.onPlaceSelect}
        locationSearch={props.locationSearch}
        onLocationSearchChange={props.onLocationSearchChange}
      />
    </div>
  );
}
