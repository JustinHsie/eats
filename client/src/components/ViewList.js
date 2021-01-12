import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import fakeList from '../fakeData/viewList';

const ViewList = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div className="p-float-label">{fakeList.title}</div>
      <div className="card">
        <DataTable value={fakeList.places}>
          <Column field="name" header="Name"></Column>
        </DataTable>
      </div>
      <div className="p-inputgroup">
        <Button label="Edit List" />
      </div>
    </div>
  );
};

export default ViewList;
