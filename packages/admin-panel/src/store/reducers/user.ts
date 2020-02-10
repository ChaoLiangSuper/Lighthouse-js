import { UserAction } from '../constants';

export interface User {
  username: string | null;
  permissions: string[];
}

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
