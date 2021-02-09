import {
  CREATE_LIST,
  GET_LIST,
  GET_LISTS,
  DELETE_LIST,
  CREATE_PLACE,
  GET_PLACE,
  UPDATE_PLACE,
  ADD_PLACE_TO_LIST,
  REMOVE_PLACE_FROM_LIST,
  DELETE_PLACE,
  SET_MENU_TAB,
  GET_DISTANCE,
} from './actionTypes';
import { history } from '../history';
import { db } from '../fakeData/db';

export function createList(name, description) {
  return async function (dispatch) {
    const listId = await db.createList(name, description);
    dispatch({
      type: CREATE_LIST,
      payload: { listId },
    });
    history.push('/');
  };
}

export function getLists() {
  return async function (dispatch) {
    const lists = await db.getLists();
    dispatch({
      type: GET_LISTS,
      payload: { lists },
    });
  };
}

export function getPlace(placeId) {
  return async function (dispatch) {
    const place = await db.getPlace(placeId);
    dispatch({
      type: GET_PLACE,
      payload: { place },
    });
  };
}

export function updatePlace(
  placeId,
  name,
  rating,
  description,
  location,
  list
) {
  return async function (dispatch) {
    await db.updatePlace(placeId, name, rating, description, location, list);
    dispatch({
      type: UPDATE_PLACE,
    });
  };
}

export function addPlaceToList(listId, placeId) {
  return async function (dispatch) {
    const list = await db.addPlaceToList(listId, placeId);
    dispatch({
      type: ADD_PLACE_TO_LIST,
      payload: { list },
    });
    history.push(`/lists/${listId}`);
  };
}

export function removePlaceFromList(listId, placeId) {
  return async function (dispatch) {
    const list = await db.removePlaceFromList(listId, placeId);
    dispatch({
      type: REMOVE_PLACE_FROM_LIST,
      payload: { list },
    });
    history.push(`/lists/${listId}`);
  };
}

export function createPlace(name, rating, description, location, list) {
  return async function (dispatch) {
    const placeId = await db.createPlace(
      name,
      rating,
      description,
      location,
      list
    );
    db.addPlaceToList(list.id, placeId);
    dispatch({
      type: CREATE_PLACE,
      payload: { placeId },
    });
    history.push(`/lists/${list.id}`);
  };
}

export function getList(listId) {
  return async function (dispatch) {
    const list = await db.getList(listId);
    dispatch({
      type: GET_LIST,
      payload: { list },
    });
  };
}

export function deleteList(listId) {
  return async function (dispatch) {
    await db.deleteList(listId);
    dispatch({
      type: DELETE_LIST,
    });
    history.push('/');
  };
}

export function deletePlace(placeId) {
  return async function (dispatch) {
    await db.deletePlace(placeId);
    dispatch({
      type: DELETE_PLACE,
    });
  };
}

export function setMenuTab(menuLabel) {
  return {
    type: SET_MENU_TAB,
    payload: { menuLabel },
  };
}

export function getDistance(userLocation, places) {
  return function (dispatch) {
    const google = window.google;
    const placeDistances = [];

    const origin = { lat: userLocation.lat, lng: userLocation.lng };
    const destinations = places.map(place => {
      const lat = place.location.mapCenter.lat;
      const lng = place.location.mapCenter.lng;
      return { lat, lng };
    });

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      callback
    );

    // Parse response
    function callback(response, status) {
      if (status === 'OK') {
        const origins = response.originAddresses;

        for (let i = 0; i < origins.length; i++) {
          let results = response.rows[i].elements;
          for (let j = 0; j < results.length; j++) {
            let element = results[j];

            placeDistances.push({
              name: places[j].name,
              distanceValue: element.distance.value,
              distanceText: element.distance.text,
            });
          }
        }
        placeDistances.sort(function (a, b) {
          return a.distanceValue - b.distanceValue;
        });
      }
      dispatch({
        type: GET_DISTANCE,
        payload: { placeDistances },
      });
    }
  };
}
