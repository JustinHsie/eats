import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { database } from '../fakeData/database';
import '../styles/ViewList.css';

export class ViewList extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.thisList = database.lists.getItem(this.id);
    this.state = { place: null };
  }

  handleClickAddPlace = () => {
    this.props.history.push('/places/new');
  };

  handleClickEditPlace = () => {
    this.props.history.push('/places/3');
  };

  handleClickDeleteList = () => {
    this.props.history.push('/');
    database.lists.deleteItem(this.id);
  };

  handleClickDeletePlace = (e, placeObject) => {
    const indexPlace = this.thisList.places.db.findIndex(
      place => place === placeObject
    );
    this.thisList.places.deleteItem(indexPlace);
    database.lists.editItem(this.id, this.thisList);
    this.props.history.push(`/lists/${this.id}`);
    e.stopPropagation();
  };

  actionBodyTemplate = placeObject => {
    return (
      <React.Fragment>
        <Button
          type="button"
          onClick={e => this.handleClickDeletePlace(e, placeObject)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
          type="button"
          onClick={this.handleClickEditPlace}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="p-m-6 p-d-flex p-jc-center">
        <div>
          <h2>{this.thisList.title}</h2>
          <p>{this.thisList.description}</p>
          <div className="card">
            <DataTable
              className="datatable_max_width"
              value={this.thisList.places.db}
              selection={this.state.place}
              onSelectionChange={e => this.setState({ place: e.value })}
              selectionMode="single"
              onRowSelect={this.handleClickEditPlace}
            >
              <Column field="name" header="Name"></Column>
              <Column
                body={placeObject => this.actionBodyTemplate(placeObject)}
              ></Column>
            </DataTable>
          </div>
          <div className="datatable_max_width p-my-6">
            <Button
              type="button"
              className="p-button-rounded"
              label="Add New Place"
              onClick={this.handleClickAddPlace}
            />
            <Button
              type="button"
              onClick={this.handleClickDeleteList}
              className="p-button-danger p-button-rounded button_float_right"
              label="Delete List"
            />
          </div>
        </div>
      </div>
    );
  }
}
