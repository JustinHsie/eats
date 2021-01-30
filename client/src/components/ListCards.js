import React from 'react';
import { Card } from 'primereact/card';

export function ListCards(props) {
  return (
    <div onClick={props.onClick}>
      <Card
        className="p-m-2 card_min_width p-link card_background_light p-d-flex p-jc-center"
        title={props.listName}
      >
        {props.listDescription}
      </Card>
    </div>
  );
}
