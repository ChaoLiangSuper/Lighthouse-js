import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './reducers/user';
import directories from './reducers/directories';
import viewState from './reducers/viewState';

const store = createStore(
  combineReducers({
    user,
    directories,
    viewState
  }),
  composeWithDevTools(applyMiddleware())
);

export default store;
