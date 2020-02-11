import { ViewAction } from '../constants';
import { ViewState } from '../../types';

const initialState: ViewState<null> = {
  view: 'login',
  state: null
};

const reducer = (state = initialState, action: ViewAction) => {
  switch (action.type) {
    case 'VIEW_UPDATE':
      return {
        ...action.data
      };
    default:
      return state;
  }
};

export default reducer;
