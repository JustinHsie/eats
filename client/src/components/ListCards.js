import React from 'react';
import { Card } from 'primereact/card';
import { CreateListCard } from './CreateListCard';

export function ListCards(props) {
  if (props.lists) {
    const cards = props.lists
      .slice(0)
      .reverse()
      .map(list => {
        return (
          <div onClick={props.handleClickList(list.id)} key={list.id}>
            <Card
              className="p-m-2 card_min_width p-link card_background_light p-d-flex p-jc-center"
              title={list.name}
            >
              {list.description}
            </Card>
          </div>
        );
      });
    return (
      <div className="p-d-flex p-jc-center p-flex-wrap">
        {cards}
        <CreateListCard handleClickNew={props.handleClickNew} />
      </div>
    );
  }
  return <CreateListCard handleClickNew={props.handleClickNew} />;
}
