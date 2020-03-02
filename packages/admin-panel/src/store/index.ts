import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './reducers/user';
import directories from './reducers/directories';
import recordCollection from './reducers/recordCollection';

const store = createStore(
  combineReducers({
    user,
    directories,
    recordCollection
  }),
  composeWithDevTools(applyMiddleware())
);

export default store;
