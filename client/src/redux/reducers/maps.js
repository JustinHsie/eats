import { GET_DISTANCE } from '../actionTypes';

const initialState = {
  placeDistances: null,
};

export function mapReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DISTANCE: {
      const { placeDistances } = action.payload;
      return { ...state, placeDistances };
    }
    default: {
      return state;
    }
  }
}
