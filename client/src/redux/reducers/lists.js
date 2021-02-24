import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  GET_LIST,
  GET_LISTS,
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
    case GET_LIST: {
      const { list } = action.payload;
      return { ...state, list };
    }
    case UPDATE_LIST: {
      return state;
    }
    case DELETE_LIST: {
      return state;
    }
    default: {
      return state;
    }
  }
}
