import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import fakePlaces from '../fakeData/places';
import fakeLists from '../fakeData/lists';
import GoogleMaps from './GoogleMaps';

const Find = () => {
  return (
    <div className="card">
      <Link to="/">Home</Link>
      <div>
        <h3>Find Near Me</h3>
      </div>
      <div className="p-inputgroup">
        <Button label="Get My Location" />
        <InputText placeholder="Location" />
      </div>
      <DataTable
        value={fakeLists}
        selectionMode="multiple"
        header="Select One or More Lists"
        metaKeySelection={false}
      >
        <Column field="name"></Column>
      </DataTable>
      <GoogleMaps
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <DataTable value={fakePlaces} header="Places Nearest to You">
        <Column field="name"></Column>
      </DataTable>
    </div>
  );
};

export default Find;
