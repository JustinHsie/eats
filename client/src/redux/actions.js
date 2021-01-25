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
} from './actionTypes';
import { db } from '../fakeData/db';

export function createList(name, description) {
  return async function (dispatch) {
    const listId = await db.createList(name, description);
    dispatch({
      type: CREATE_LIST,
      payload: { listId },
    });
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
  };
}

export function removePlaceFromList(listId, placeId) {
  return async function (dispatch) {
    const list = await db.removePlaceFromList(listId, placeId);
    dispatch({
      type: REMOVE_PLACE_FROM_LIST,
      payload: { list },
    });
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
    dispatch({
      type: CREATE_PLACE,
      payload: { placeId },
    });
    db.addPlaceToList(list.id, placeId);
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
  };
}

export function deletePlace(placeId) {
  return async function (dispatch) {
    const place = await db.getPlace(placeId);
    await db.deletePlace(placeId);
    dispatch({
      type: DELETE_PLACE,
    });

    const list = await db.removePlaceFromList(place.list.id, placeId);
    dispatch({
      type: REMOVE_PLACE_FROM_LIST,
      payload: { list },
    });
  };
}
