import * as actions from './action-types';
import { BugActions, BugState } from './types';

let lastId = 0;
const initialState: BugState = [];

export const reducer = (state = initialState, action: BugActions) => {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id === action.payload.id
          ? {
              ...bug,
              resolved: true,
            }
          : bug
      );
    default:
      return state;
  }
};
