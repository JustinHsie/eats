import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

export function Menu(props) {
  return (
    <TabMenu
      className="p-d-flex p-flex-wrap p-jc-center p-m-2"
      model={props.model}
      activeItem={props.activeItem}
      onTabChange={props.handleOnTabChange}
    />
  );
}
