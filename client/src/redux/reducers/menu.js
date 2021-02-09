import { SET_MENU_TAB } from '../actionTypes';

const initialState = {
  menuLabel: 'Home',
};

export function menuReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MENU_TAB: {
      const { menuLabel } = action.payload;
      return { ...state, menuLabel };
    }
    default: {
      return state;
    }
  }
}
