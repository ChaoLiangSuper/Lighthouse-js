export interface User {
  username: string | null;
  permissions: string[];
}

export interface UserAction {
  type: 'LOGIN';
}

const initialState = {
  username: null,
  permissions: []
};

const reducer = (state = initialState, action: UserAction): User => {
  switch (action.type) {
    case 'LOGIN':
    default:
      return state;
  }
};

export default reducer;
