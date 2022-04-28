import { BugActions, BugState } from './types';
import { uuid } from './uuid';

let lastId = '';
const initialState: BugState = [];

export const reducer = (state = initialState, action: BugActions) => {
  switch (action.type) {
    case 'ADD_BUG':
      return [
        ...state,
        {
          id: uuid(11),
          description: action.payload.description,
          resolved: false,
        },
      ];
    case 'REMOVE_BUG':
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
};
