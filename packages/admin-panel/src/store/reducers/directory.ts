import { DirectoryAction } from '../constants';

export interface Directory {
  [s: string]: {};
}

const initialState: Directory = {};

const reducer = (state = initialState, action: DirectoryAction) => {
  switch (action.type) {
    case 'DIRECTORY_UPDATE':
      return {
        ...initialState,
        ...action.data
      };
    default:
      return state;
  }
};

export default reducer;
