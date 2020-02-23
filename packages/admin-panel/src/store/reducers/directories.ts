import { DirectoryAction } from '../actions';
import { DirectoryCollection } from '../../types';
import { fieldType } from '../../constant';

const initialState: DirectoryCollection = {
  directory1: {
    name: 'directory1',
    columnKeyInMainTable: ['column1', 'column2', 'column3'],
    columns: [
      {
        name: 'column1',
        type: fieldType.BOOLEAN,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column2',
        type: fieldType.NUMBER,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column3',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column4',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column5',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      }
    ],
    numOfRecords: 1
  },
  directory2: {
    name: 'directory2',
    columnKeyInMainTable: ['column1', 'column2'],
    columns: [
      {
        name: 'column1',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column2',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column3',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column4',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      },
      {
        name: 'column5',
        type: fieldType.STRING,
        isOptional: true,
        defaultValue: ''
      }
    ],
    numOfRecords: 0
  }
};

const reducer = (state = initialState, action: DirectoryAction) => {
  switch (action.type) {
    case 'DIRECTORY_COLUMNS_UPDATE':
      return {
        ...initialState,
        [action.data.name]: {
          ...initialState[action.data.name],
          columns: action.data.columns
        }
      };
    default:
      return state;
  }
};

export default reducer;
