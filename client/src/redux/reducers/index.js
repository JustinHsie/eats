import { combineReducers } from 'redux';
import { listReducer } from './lists';
import { placeReducer } from './places';
import { menuReducer } from './menu';

export const rootReducer = combineReducers({
  lists: listReducer,
  places: placeReducer,
  menu: menuReducer
});
