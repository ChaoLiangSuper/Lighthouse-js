import { UserAction } from '../actions';
import { User } from '../../types/types';

const initialState: User = {
  username: null,
  permissions: []
};

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.data
      };
    case 'LOGOUT':
    default:
      return state;
  }
};

export default reducer;
