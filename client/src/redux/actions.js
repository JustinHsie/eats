import {
  CREATE_LIST,
  GET_LIST,
  UPDATE_LIST,
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
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  LOGIN,
  LOGOUT,
} from './actionTypes';
import { history } from '../history';
import axios from 'axios';

/**
 * Lists
 */

export function createList(name, description) {
  return async function (dispatch) {
    const response = await axios.post('/api/lists', {
      name,
      description,
    });
    const listId = response.data;
    dispatch({
      type: CREATE_LIST,
      payload: { listId },
    });
    history.push('/');
  };
}

export function getLists() {
  return async function (dispatch) {
    const response = await axios.get('/api/lists');
    const lists = response.data;
    dispatch({
      type: GET_LISTS,
      payload: { lists },
    });
  };
}

export function addPlaceToList(listId, placeId) {
  return async function (dispatch) {
    const response = await axios.post(`/api/lists/${listId}/places/${placeId}`);
    const list = response.data;
    dispatch({
      type: ADD_PLACE_TO_LIST,
      payload: { list },
    });
    history.push(`/lists/${listId}`);
  };
}

export function removePlaceFromList(listId, placeId) {
  return async function (dispatch) {
    const response = await axios.delete(
      `/api/lists/${listId}/places/${placeId}`
    );
    const list = response.data;
    dispatch({
      type: REMOVE_PLACE_FROM_LIST,
      payload: { list },
    });
    history.push(`/lists/${listId}`);
  };
}

export function getList(listId) {
  return async function (dispatch) {
    const response = await axios.get(`/api/lists/${listId}`);
    const list = response.data;
    dispatch({
      type: GET_LIST,
      payload: { list },
    });
  };
}

export function updateList(listId, name, description) {
  return async function (dispatch) {
    await axios.put(`/api/lists/${listId}`, {
      listId,
      name,
      description,
    });
    dispatch({
      type: UPDATE_LIST,
    });
  };
}

export function deleteList(listId) {
  return async function (dispatch) {
    await axios.delete(`/api/lists/${listId}`);
    dispatch({
      type: DELETE_LIST,
    });
    history.push('/');
  };
}

/**
 * Places
 */

export function getPlace(placeId) {
  return async function (dispatch) {
    const response = await axios.get(`/api/places/${placeId}`);
    const place = response.data;
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
    await axios.put(`/api/places/${placeId}`, {
      placeId,
      name,
      rating,
      description,
      location,
      list,
    });
    dispatch({
      type: UPDATE_PLACE,
    });
  };
}

export function createPlace(name, rating, description, location, list) {
  return async function (dispatch) {
    const response = await axios.post('/api/places', {
      name,
      rating,
      description,
      location,
      list,
    });
    const placeId = response.data;
    dispatch({
      type: CREATE_PLACE,
      payload: { placeId },
    });
  };
}

export function deletePlace(placeId) {
  return async function (dispatch) {
    await axios.delete(`/api/places/${placeId}`);
    dispatch({
      type: DELETE_PLACE,
    });
  };
}

/**
 * Users
 */

export function createUser(username, password) {
  return async function (dispatch) {
    const response = await axios.post('/auth/register', {
      username,
      password,
    });
    const userId = response.data;
    console.log(userId);
    dispatch({
      type: CREATE_USER,
      payload: { userId },
    });
    if (userId !== 'taken') {
      history.push('/');
    }
  };
}

export function login(username, password) {
  return async function (dispatch) {
    const response = await axios.post('/auth/login', {
      username,
      password,
    });
    const userId = response.data;
    dispatch({
      type: LOGIN,
      payload: { userId },
    });
  };
}

/**
 * Misc
 */

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
