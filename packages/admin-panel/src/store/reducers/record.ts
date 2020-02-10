import { RecordAction } from '../constants';

export interface Record {
  [s: string]: {};
}

const initialState: Record = {};

const reducer = (state = initialState, action: RecordAction) => {
  switch (action.type) {
    case 'RECORD_UPDATE':
      return {
        ...initialState,
        ...action.data
      };
    default:
      return state;
  }
};

export default reducer;
