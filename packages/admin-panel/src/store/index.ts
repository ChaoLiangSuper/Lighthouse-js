import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user, { User } from './reducers/user';

export interface Store {
  user: User;
}

const store = createStore(
  combineReducers({
    user
  }),
  composeWithDevTools(applyMiddleware())
);

export default store;
