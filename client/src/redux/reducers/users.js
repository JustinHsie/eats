import { CREATE_USER, LOGIN } from '../actionTypes';

const initialState = {
  userId: '',
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER: {
      const { userId } = action.payload;
      return { ...state, userId };
    }
    case LOGIN: {
      const { userId } = action.payload;
      return { ...state, userId };
    }
    default: {
      return state;
    }
  }
}
