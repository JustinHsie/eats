import {
  ADD_PLACE_TO_LIST,
  CREATE_LIST,
  DELETE_LIST,
  GET_LIST,
  GET_LISTS,
  REMOVE_PLACE_FROM_LIST,
} from '../actionTypes';

const initialState = {
  list: null,
  allLists: [],
};

export function listReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LIST: {
      return state;
    }
    case GET_LISTS: {
      const { lists } = action.payload;
      return { ...state, allLists: lists };
    }
    case ADD_PLACE_TO_LIST: {
      const { list } = action.payload;
      return { ...state, list };
    }
    case REMOVE_PLACE_FROM_LIST: {
      const { list } = action.payload;
      return { ...state, list };
    }
    case GET_LIST: {
      const { list } = action.payload;
      return { ...state, list };
    }
    case DELETE_LIST: {
      return state;
    }
    default:
      return state;
  }
}
