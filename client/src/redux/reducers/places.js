import {
  CREATE_PLACE,
  DELETE_PLACE,
  GET_PLACE,
  UPDATE_PLACE,
} from '../actionTypes';

const initialState = {
  place: null,
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
      return state;
    }
    case DELETE_PLACE: {
      return state;
    }
    default:
      return state;
  }
}
