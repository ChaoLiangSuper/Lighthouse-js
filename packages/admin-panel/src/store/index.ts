import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './reducers/user';
import directories from './reducers/directories';
import records from './reducers/records';

const store = createStore(
  combineReducers({
    user,
    directories,
    records
  }),
  composeWithDevTools(applyMiddleware())
);

export default store;
