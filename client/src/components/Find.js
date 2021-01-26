import React from 'react';
import { connect } from 'react-redux';
import { getLists } from '../redux/actions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { places as fakePlaces } from '../fakeData/places';
import { GoogleMaps } from './GoogleMaps';
import '../styles/Find.css';

export class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedList: null };
  }

  componentDidMount() {
    this.props.getLists();
  }

  handleSetState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <div className="p-m-3 p-m-lg-6">
        <div className="card p-d-flex p-jc-center p-flex-column p-flex-md-row">
          <div className="p-mx-6">
            <div>
              <h2>Find Near Me</h2>
            </div>
            <div className="form__input_text_max_width">
              <div className="p-inputgroup">
                <InputText className="p-mb-2" placeholder="Get My Location" />
                <Button
                  className="p-mx-2 p-button-raised p-button-text p-button-rounded"
                  icon="pi pi-search"
                />
              </div>
            </div>
            <h3>Select List</h3>
            <div className="card p-mb-6">
              <Dropdown
                value={this.state.selectedList}
                options={this.props.lists}
                onChange={this.handleSetState('selectedList')}
                optionLabel="name"
                placeholder="Select a List"
              />
            </div>
          </div>
          <div className="p-mx-6 p-mb-6">
            <h3>Places Nearest to You</h3>
            <div className="datatable_max_width">
              <DataTable value={fakePlaces} selectionMode="single">
                <Column field="name" header="Name"></Column>
              </DataTable>
            </div>
          </div>
        </div>
        <div className="p-my-6">
          <GoogleMaps
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { lists } = state;
  return { lists: lists.allLists };
}

const mapDispatch = {
  getLists,
};

export const ConnectFind = connect(mapState, mapDispatch)(Find);
