import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { viewList as fakeList } from '../fakeData/viewList';
import { database } from '../fakeData/database';
import '../styles/ViewList.css';

export class ViewList extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { list: database.lists.getItem(this.id), place: null };
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

  actionBodyTemplate = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
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
          <h2>{this.state.list.title}</h2>
          <p>{this.state.list.description}</p>
          <div className="card">
            <DataTable
              className="datatable_max_width"
              value={fakeList.places}
              selection={this.state.place}
              onSelectionChange={e => this.setState({ place: e.value })}
              selectionMode="single"
              onRowSelect={this.handleClickEditPlace}
            >
              <Column field="name" header="Name"></Column>
              <Column body={this.actionBodyTemplate}></Column>
            </DataTable>
          </div>
          <div className="datatable_max_width p-my-6">
            <Button
              className="p-button-rounded"
              label="Add New Place"
              onClick={this.handleClickAddPlace}
            />
            <Button
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
