import { DirectoryAction } from '../actions';
import { DirectoryCollection } from '../../types';

const initialState: DirectoryCollection = {
  directory1: {
    name: 'directory1',
    keysInTable: ['key', 'column1', 'column2', 'column3'],
    schema: [
      {
        column: 'key',
        type: 'string',
        isOptional: false
      },
      {
        column: 'column1',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column2',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column3',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column4',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column5',
        type: 'string',
        isOptional: true
      }
    ],
    numOfRecords: 1
  },
  directory2: {
    name: 'directory2',
    keysInTable: ['key', 'column1', 'column2'],
    schema: [
      {
        column: 'key',
        type: 'string',
        isOptional: false
      },
      {
        column: 'column1',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column2',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column3',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column4',
        type: 'string',
        isOptional: true
      },
      {
        column: 'column5',
        type: 'string',
        isOptional: true
      }
    ],
    numOfRecords: 0
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
