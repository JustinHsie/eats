import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useHistory} from 'react-router-dom';
import { viewList as fakeList } from '../fakeData/viewList';

export const ViewList = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/lists/edit");
  }
  return (
    <div>
      <div className="p-float-label">{fakeList.title}</div>
      <div className="card">
        <DataTable value={fakeList.places}>
          <Column field="name" header="Name"></Column>
        </DataTable>
      </div>
      <div className="p-inputgroup">
        <Button label="Edit List" onClick={handleClick}/>
      </div>
    </div>
  );
};
