import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { db } from '../fakeData/db';
import '../styles/ViewList.css';

export class ViewList extends React.Component {
  constructor(props) {
    super(props);
    this.listId = this.props.match.params.id;
    this.state = { place: null, currentList: null };
  }

  componentDidMount() {
    this.getCurrentList();
  }

  getCurrentList = async () => {
    const currentList = await db.getList(this.listId);
    this.setState({ currentList });
  };

  handleClickAddPlace = () => {
    this.props.history.push('/places/new');
  };

  handleClickEditPlace = placeId => {
    this.props.history.push(`/places/${placeId}`);
  };

  handleClickDeleteList = async () => {
    await db.deleteList(this.listId);
    this.props.history.push('/');
  };

  handleClickDeletePlace = async (e, placeObject) => {
    e.stopPropagation();
    await db.removePlaceFromList(this.listId, placeObject.id);
    await db.deletePlace(placeObject.id);
    this.getCurrentList();
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
          onClick={() => this.handleClickEditPlace(placeObject.id)}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  displayTable = () => {
    if (this.state.currentList) {
      return (
        <div>
          <h2>{this.state.currentList.name}</h2>
          <p>{this.state.currentList.description}</p>
          <div className="card">
            <DataTable
              className="datatable_max_width"
              value={this.state.currentList.places}
              selection={this.state.place}
              onSelectionChange={e => this.setState({ place: e.value })}
              selectionMode="single"
              onRowSelect={e => this.handleClickEditPlace(e.data.id)}
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
      );
    }
    return (
      <div>
        <h5>Loading...</h5>
      </div>
    );
  };

  render() {
    return (
      <div className="p-m-6 p-d-flex p-jc-center">{this.displayTable()}</div>
    );
  }
}
