import { createStore, combineReducers } from 'redux';
import user, { User } from './reducers/user';

export interface Store {
  user: User;
}

const store = createStore(
  combineReducers({
    user
  })
);

export default store;
