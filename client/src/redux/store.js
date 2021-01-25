import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
const thunk = require('redux-thunk').default;

export const store = createStore(rootReducer, applyMiddleware(thunk));
