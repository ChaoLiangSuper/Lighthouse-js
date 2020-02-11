import { DirectoryAction } from '../constants';
import { DirectoryCollection } from '../../types';

const initialState: DirectoryCollection = {
  directory1: {
    name: 'directory1',
    records: {}
  },
  directory2: {
    name: 'directory2',
    records: {}
  }
};

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
