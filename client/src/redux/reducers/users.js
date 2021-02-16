import { CREATE_USER, GET_SESSION, LOGIN } from '../actionTypes';

const initialState = {
  validRegister: 'initial',
  validLogin: 'initial',
  sessionUserId: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER: {
      const { userId } = action.payload;
      return { ...state, validRegister: userId, sessionUserId: userId };
    }
    case LOGIN: {
      const { userId } = action.payload;
      return { ...state, validLogin: userId, sessionUserId: userId };
    }
    case GET_SESSION: {
      const { userId } = action.payload;
      return { ...state, sessionUserId: userId };
    }
    default: {
      return state;
    }
  }
}
