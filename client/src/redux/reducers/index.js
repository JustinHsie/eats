import { combineReducers } from 'redux';
import { listReducer } from './lists';
import { placeReducer } from './places';
import { menuReducer } from './menu';
import { mapReducer } from './maps';
import { userReducer } from './users';

export const rootReducer = combineReducers({
  lists: listReducer,
  places: placeReducer,
  menu: menuReducer,
  maps: mapReducer,
  users: userReducer,
});
