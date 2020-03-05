import { RecordAction, recordActionType } from '../actions';
import { RecordCollection } from '../../types';

const initialState: RecordCollection = {
  directory1: {
    '9f9320d6-6b9c-4c75-ad66-2f164fb0bac9': {
      key: '9f9320d6-6b9c-4c75-ad66-2f164fb0bac9',
      column1: 'test-column1'
    },
    '8f636924-5c05-43e2-a7dc-9c7b26f3dc38': {
      key: '8f636924-5c05-43e2-a7dc-9c7b26f3dc38',
      column1: 'test-column1'
    },
    'ae825be9-583a-4c82-9c22-465c04c26e1d': {
      key: 'ae825be9-583a-4c82-9c22-465c04c26e1d',
      column1: 'test-column1'
    }
  }
};

const reducer = (state = initialState, action: RecordAction) => {
  switch (action.type) {
    case recordActionType.RECORD_UPDATE: {
      const directoryName = action.data.directoryName;
      return {
        ...state,
        [directoryName]: {
          ...initialState[directoryName],
          [action.data.updatedField.key]: action.data.updatedField
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
