import {
  CREATE_LIST,
  GET_LIST,
  UPDATE_LIST,
  GET_LISTS,
  DELETE_LIST,
  CREATE_PLACE,
  GET_PLACE,
  UPDATE_PLACE,
  DELETE_PLACE,
  SET_MENU_TAB,
  GET_DISTANCE,
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
  LOGIN,
  LOGOUT,
  GET_SESSION,
  RESET_USER_FORM,
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
  list,
  initialList
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
    history.push(`/lists/${initialList.id}`);
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
    history.push(`/lists/${list.id}`);
  };
}

export function deletePlace(placeId, listId) {
  return async function (dispatch) {
    await axios.delete(`/api/places/${placeId}`);
    dispatch({
      type: DELETE_PLACE,
      payload: { placeId },
    });
    history.push(`/lists/${listId}`);
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
    dispatch({
      type: CREATE_USER,
      payload: { userId },
    });
    if (userId) {
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
    if (userId) {
      history.push('/');
    }
  };
}

export function getSession() {
  return async function (dispatch) {
    const response = await axios.get('/auth/session');
    const userId = response.data;
    dispatch({
      type: GET_SESSION,
      payload: { userId },
    });
    if (userId) {
      history.push('/');
    }
  };
}

export function logout() {
  return async function (dispatch) {
    await axios.post('/auth/logout');
    dispatch({
      type: LOGOUT,
    });
    history.push('/login');
  };
}

export function getUser(id) {
  return async function (dispatch) {
    const response = await axios.get(`/auth/users/${id}`);
    const user = response.data;
    dispatch({
      type: GET_USER,
      payload: { user },
    });
  };
}

export function updateUser(id, oldPass, newPass) {
  return async function (dispatch) {
    const response = await axios.put(`/auth/users/${id}`, {
      id,
      oldPass,
      newPass,
    });
    const userId = response.data;
    dispatch({
      type: UPDATE_USER,
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

export function resetUserForm() {
  return {
    type: RESET_USER_FORM,
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
