import React from 'react';
import { Rating as RatingPrime } from 'primereact/rating';

export function Rating(props) {
  return (
    <RatingPrime
      value={props.state.rating}
      onChange={props.handleSetState('rating')}
      className="p-mb-2"
    />
  );
}
