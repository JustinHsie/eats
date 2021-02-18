import {
  CREATE_USER,
  GET_SESSION,
  GET_USER,
  LOGIN,
  LOGOUT,
  RESET_USER_FORM,
  UPDATE_USER,
} from '../actionTypes';

const initialState = {
  validRegister: 'initial',
  validLogin: 'initial',
  sessionUserId: null,
  user: null,
  validOldPass: 'initial',
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
    case LOGOUT: {
      return {
        ...state,
        sessionUserId: null,
        validRegister: 'initial',
        validLogin: 'initial',
      };
    }
    case GET_USER: {
      const { user } = action.payload;
      return { ...state, user };
    }
    case UPDATE_USER: {
      const { userId } = action.payload;
      return { ...state, validOldPass: userId };
    }
    case RESET_USER_FORM: {
      return {
        ...state,
        validRegister: 'initial',
        validLogin: 'initial',
        validOldPass: 'initial',
      };
    }
    default: {
      return state;
    }
  }
}
