import React from 'react';
import { connect } from 'react-redux';
import { getLists, getList, setMenuTab } from '../../redux/actions';
import { Find as FindComponent } from '../../components/Find';
import { getUserLocation } from './getUserLocation';
import { getDistance } from '../../redux/actions';
import './index.css';

class FindClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: null,
      places: null,
      userLocation: null,
      buttonTextUserLocation: 'Go',
      buttonIconUserLocation: 'pi pi-map-marker',
      buttonTextFind: 'Find Near Me',
      buttonIconFind: 'pi pi-map',
      buttonFindDisabled: true,
      findResults: null,
      mapCenter: null,
    };
    this.props.setMenuTab('Find Near Me');
  }

  componentDidMount() {
    this.props.getLists();
  }

  componentDidUpdate(prevProps, prevState) {
    // Set places state after fetching list
    if (this.props.list !== prevProps.list) {
      this.setState({ places: this.props.list.places });
    }
    // Enable button if places and userLocation fetched
    if (
      this.state.places !== prevState.places ||
      this.state.userLocation !== prevState.userLocation
    ) {
      if (this.state.places && this.state.userLocation) {
        this.setState({ buttonFindDisabled: false });
      }
    }
    // Set mapCenter to first find result
    if (this.props.findResults !== prevProps.findResults) {
      let mapCenter = null;
      for (const place of this.state.places) {
        if (this.props.findResults[0].name === place.name) {
          mapCenter = place.location.mapCenter;
        }
      }
      this.setState({ mapCenter });
    }
  }

  handleSelectedListChange = e => {
    this.props.getList(e.value.id);
    this.setState({
      selectedList: e.value,
    });
  };

  handleUserLocation = () => {
    const success = pos => {
      const mapCenter = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      this.setState({
        userLocation: mapCenter,
        buttonTextUserLocation: 'Ready!',
        buttonIconUserLocation: 'pi pi-check',
      });
    };
    getUserLocation(success);
    this.setState({
      buttonTextUserLocation: 'Loading...',
      buttonIconUserLocation: 'pi pi-spin pi-spinner',
    });
  };

  handleFind = () => {
    this.props.getDistance(this.state.userLocation, this.state.places);
  };

  handleSelectedPlaceChange = e => {
    let mapCenter = null;
    for (const place of this.state.places) {
      if (e.value.name === place.name) {
        mapCenter = place.location.mapCenter;
      }
    }
    this.setState({ mapCenter });
  };

  render() {
    return (
      <FindComponent
        selectedList={this.state.selectedList}
        onSelectedListChange={this.handleSelectedListChange}
        lists={this.props.lists}
        buttonTextUserLocation={this.state.buttonTextUserLocation}
        buttonIconUserLocation={this.state.buttonIconUserLocation}
        onClickUserLocation={this.handleUserLocation}
        buttonTextFind={this.state.buttonTextFind}
        buttonIconFind={this.state.buttonIconFind}
        onClickFind={this.handleFind}
        buttonFindDisabled={this.state.buttonFindDisabled}
        findResults={this.props.findResults}
        onSelectedPlaceChange={this.handleSelectedPlaceChange}
        mapCenter={this.state.mapCenter}
      />
    );
  }
}

function mapState(state) {
  const { lists } = state;
  const { maps } = state;
  return {
    lists: lists.allLists,
    list: lists.list,
    findResults: maps.placeDistances,
  };
}

const mapDispatch = {
  getLists,
  getList,
  setMenuTab,
  getDistance,
};

export const Find = connect(mapState, mapDispatch)(FindClass);
