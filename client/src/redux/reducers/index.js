import { combineReducers } from 'redux';
import { listReducer } from './lists';
import { placeReducer } from './places';

export const rootReducer = combineReducers({
  lists: listReducer,
  places: placeReducer,
});
