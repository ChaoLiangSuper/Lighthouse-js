import { DirectoryAction } from '../actions';
import { DirectoryCollection } from '../../types';

const initialState: DirectoryCollection = {
  directory1: {
    name: 'directory1',
    keysInTable: ['key', 'column1', 'column2', 'column3'],
    schema: [
      {
        name: 'key',
        type: 'string',
        isOptional: false,
        defaultValue: ''
      },
      {
        name: 'column1',
        type: 'boolean',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column2',
        type: 'number',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column3',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column4',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column5',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      }
    ],
    numOfRecords: 1
  },
  directory2: {
    name: 'directory2',
    keysInTable: ['key', 'column1', 'column2'],
    schema: [
      {
        name: 'key',
        type: 'string',
        isOptional: false,
        defaultValue: ''
      },
      {
        name: 'column1',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column2',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column3',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column4',
        type: 'string',
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column5',
        type: 'string',
        isOptional: true,
        defaultValue: ''
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
