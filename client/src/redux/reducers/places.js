import {
  CREATE_PLACE,
  DELETE_PLACE,
  GET_PLACE,
  UPDATE_PLACE,
} from '../actionTypes';

const initialState = {
  place: null,
  placeId: null,
  deletedPlace: null,
};

export function placeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLACE: {
      const { place } = action.payload;
      return {
        ...state,
        place,
      };
    }
    case UPDATE_PLACE: {
      return state;
    }
    case CREATE_PLACE: {
      const { placeId } = action.payload;
      return { ...state, placeId };
    }
    case DELETE_PLACE: {
      const { placeId } = action.payload;
      return { ...state, deletedPlace: placeId };
    }
    default: {
      return state;
    }
  }
}
