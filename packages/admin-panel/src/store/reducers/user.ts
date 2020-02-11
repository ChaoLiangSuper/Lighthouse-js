import { UserAction } from '../constants';
import { User } from '../../types';

const initialState: User = {
  username: null,
  permissions: []
};

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...initialState,
        ...action.data
      };
    case 'LOGOUT':
    default:
      return state;
  }
};

export default reducer;
