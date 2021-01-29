import React from 'react';
import { Card } from 'primereact/card';

export function CreateListCard(props) {
  return (
    <div onClick={props.onClick} className="p-d-flex p-jc-center">
      <Card
        className="p-m-2 card_min_width p-link card_background_dark p-d-flex p-jc-center"
        title="Create List"
      >
        <i className="pi pi-plus p-d-flex p-jc-center" />
      </Card>
    </div>
  );
}
