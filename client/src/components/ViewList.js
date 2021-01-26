import React from 'react';
import { connect } from 'react-redux';
import { history } from '../history';
import {
  getList,
  deleteList,
  deletePlace,
  removePlaceFromList,
} from '../redux/actions';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../styles/ViewList.css';

export class ViewList extends React.Component {
  constructor(props) {
    super(props);
    this.listId = this.props.match.params.id;
    this.state = { place: null };
  }

  componentDidMount() {
    this.props.getList(this.listId);
  }

  handleDeleteList = () => {
    this.props.deleteList(this.listId);
  };

  handleDeletePlace = (e, placeObject) => {
    e.stopPropagation();
    this.props.deletePlace(placeObject.id);
    this.props.removePlaceFromList(placeObject.list.id, placeObject.id);
  };

  actionBodyTemplate = placeObject => {
    return (
      <React.Fragment>
        <Button
          type="button"
          onClick={e => this.handleDeletePlace(e, placeObject)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-ml-2 button_float_right"
        />
        <Button
          type="button"
          onClick={e => history.push(`/places/${e.id}`)}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success button_float_right"
        />
      </React.Fragment>
    );
  };

  displayTable() {
    if (this.props.currentList) {
      return (
        <div>
          <h2>{this.props.currentList.name}</h2>
          <p>{this.props.currentList.description}</p>
          <div className="card">
            <DataTable
              className="datatable_max_width"
              value={this.props.currentList.places}
              selection={this.state.place}
              onSelectionChange={e => this.setState({ place: e.value })}
              selectionMode="single"
              onRowSelect={e => history.push(`/places/${e.data.id}`)}
            >
              <Column field="name" header="Name"></Column>
              <Column body={this.actionBodyTemplate}></Column>
            </DataTable>
          </div>
          <div className="datatable_max_width p-my-6">
            <Button
              type="button"
              className="p-button-rounded"
              label="Add New Place"
              onClick={() => history.push('/places/new')}
            />
            <Button
              type="button"
              onClick={this.handleDeleteList}
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
  }

  render() {
    return (
      <div className="p-m-6 p-d-flex p-jc-center">{this.displayTable()}</div>
    );
  }
}

function mapState(state) {
  const { lists } = state;
  return { currentList: lists.list };
}

const mapDispatch = {
  getList,
  deleteList,
  deletePlace,
  removePlaceFromList,
};

export const connectViewList = connect(mapState, mapDispatch)(ViewList);
