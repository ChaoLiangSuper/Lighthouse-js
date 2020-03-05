import { DirectoryAction, directoryActionType } from '../actions';
import { DirectoryCollection } from '../../types';
import { fieldType } from '../../constant';

const initialState: DirectoryCollection = {
  directory1: {
    name: 'directory1',
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
    numOfRecords: 3
  },
  directory2: {
    name: 'directory2',
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
    case directoryActionType.DIRECTORY_COLUMNS_UPDATE:
      return {
        ...state,
        [action.data.name]: {
          ...initialState[action.data.name],
          columns: action.data.columns
        }
      };
    case directoryActionType.DIRECTORY_ADD:
      return {
        ...state,
        [action.data.name]: {
          name: action.data.name,
          columns: [],
          numOfRecords: 0
        }
      };
    default:
      return state;
  }
};

export default reducer;
