import React from 'react';
import { Rating as RatingPrime } from 'primereact/rating';

export function Rating(props) {
  return (
    <RatingPrime
      value={props.rating}
      onChange={props.onRatingChange('rating')}
      className="p-mb-2"
    />
  );
}
